const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OwnerSchema = new Schema({
    name: {
        FName: { type: String, required: true },
        LName: { type: String, required: true },
    },
    email: { type: String, unique:true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: "Owner"},
    personalID: { type: String, required: true, unique: true },
    ownedParking: [{type: String}]
}, {
    versionKey: false
},
    { collection: 'Owners' });

module.exports = mongoose.model('Owner', OwnerSchema, "owners");
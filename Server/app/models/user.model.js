const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        FName: { type: String, required: true },
        LName: { type: String, required: true },
    },
    email: { type: String, unique:true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true},
    carplateNumber: [{type: String, unique: true}],
    personalID: { type: String, required: true, unique: true },
    successBooking: [{type: String}],
    currentBooking: { type: String},
    failBooking: [{type: String}]
}, {
    versionKey: false
},
    { collection: 'Users' });

module.exports = mongoose.model('User', UserSchema, "users");
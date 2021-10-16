const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    name: {
        FName: { type: String, required: true },
        LName: { type: String, required: true },
    },
    email: { type: String, unique:true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, default: "Admin" },
    edits: [{type: String}]
}, {
    versionKey: false
},
    { collection: 'Admins' });

module.exports = mongoose.model('Admin', AdminSchema, "admins");
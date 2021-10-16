const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    time: {
        sent: { type: String, required: true },
        received: { type: String, required: true },
    },
    parkinglotID: { type: String, required: true },
    edge_id: { type: String, required: true },
    areaName: { type: String, required: true },
    slots: []
}, {
    versionKey: false
},
    { collection: 'Requests' });

module.exports = mongoose.model('Request', RequestSchema, "requests");
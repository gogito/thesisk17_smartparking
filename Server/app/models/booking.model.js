const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
    userID: { type: String, required: true },
    parkinglotID: { type: String, required: true },
    areaName: { type: String, required: true },
    slot_id: { type: String, required: true },
    status: { type: String, required: true },
    created_at: { type: String, required: true }
}, {
    versionKey: false
},
    { collection: 'Booking' });

module.exports = mongoose.model('Booking', BookingSchema, "bookings");
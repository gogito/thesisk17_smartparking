const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ParkingLotSchema = new Schema({
    coordinate: {
        longitude: { type: String, required: true },
        latitude: { type: String, required: true }
    },
    detail_address: {
        number: { type: String, required: true },
        street: { type: String, required: true },
        district: { type: String, required: true },
        city_province: { type: String, required: true },
        country: { type: String, required: true }
    },
    address: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    status: { type: String, required: true },
    area: [],
    image: { type: String },
    ownerID: { type: String }
},
    {
        versionKey: false
    });
module.exports = mongoose.model('ParkingLot', ParkingLotSchema, "parkinglots");
const ParkingLot = require('../models/parkinglot.model.js');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

const cal_from_current = async (currentLat, currentLon, id) => {
    return ParkingLot.findById(id)
        .then(parkinglot => {
            console.log(parkinglot.coordinate)
            const result = getDistanceFromLatLonInKm(
                currentLat,
                currentLon,
                parkinglot.coordinate.latitude,
                parkinglot.coordinate.longitude);

            return result;
        })
}

const cal_all_db_distance = async (currentLat, currentLon, radius) => {

    var subArray = []
    data = await ParkingLot.find()
    data.forEach(parkinglot => {
        const result = getDistanceFromLatLonInKm(
            currentLat,
            currentLon,
            parkinglot.coordinate.latitude,
            parkinglot.coordinate.longitude);

        if (result <= radius) {
            parkinglot.distance = result;
            subArray.push({
                parkinglot: parkinglot,
                distance: result
            })
        }
    });
    return subArray;
}

exports.cal_distance = async (req, res) => {
    const result = await cal_all_db_distance(
        req.body.current.latitude,
        req.body.current.longitude,
        req.body.radius);
    res.json({ "resultArray": result });
};



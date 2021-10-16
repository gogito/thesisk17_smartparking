const ParkingLot = require('../models/parkinglot.model.js');
const plfunc = require('../function/parkinglots.function.js');

exports.getAreainfo = async (req, res) => {
    console.log("Start: " + new Date)
    var finalArray = [];
    let parkinglotArray = await ParkingLot.find().lean().exec();
    for (let n = 0; n < parkinglotArray.length; n++) {
        finalArray = finalArray.concat(plfunc.extract_area_from_parkinglot(parkinglotArray[n]));
    }
    res.send(finalArray);
    console.log("Done: " + new Date)

};


exports.simulate_edge = async (req, res) => {
    res.send({ message: "Process started" });
    var finalArray = [];
    let parkinglotArray = await ParkingLot.find().lean().exec();
    for (let n = 0; n < parkinglotArray.length; n++) {
        finalArray = finalArray.concat(plfunc.extract_area_from_parkinglot(parkinglotArray[n]));
    }


    for (u = 0; u < 232; u++) {
        // await this.sleep(1);
        let random = plfunc.getRandomIntInclusive(0, (finalArray.length - 1));
        // for (let e = 0; e < 2; e++) {
            plfunc.send_update(finalArray[random]);
        // }
        // plfunc.get_test();


    }

};

exports.sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const ParkingLot = require('../models/parkinglot.model.js');
const Owner = require('../models/owner.model.js');
const bookingfunc = require('../function/booking.function.js');
const Booking = require('../models/booking.model.js');
const fetch = require('node-fetch');
exports.cal_status_func = async (id) => {

    var full_num = 0;
    var total_num = 0;
    var status = 5;

    data = await ParkingLot.findById(id)

    data.area.forEach(Melement => {
        Melement.slots.forEach(element => {
            if (element != 0) {
                full_num = full_num + 1;
            }
            total_num = total_num + 1;
        }
        )
    }
    )
    status = full_num / total_num;
    return status;
}


exports.cal_single_slot_func = (array, name, price, coordinate_array) => {

    var fullslot = 0;
    var freeslot = 0;
    var resultObject;
    array.forEach(element => {

        if (element == 0) {
            freeslot = freeslot + 1;
        }

        else {
            fullslot = fullslot + 1;
        }
    }
    )
    resultObject = {
        name: name,
        slots: array,
        price: price,
        fullslot: fullslot,
        freeslot: freeslot,
        coordinate_array: coordinate_array

    };
    return resultObject;

}

exports.cal_slot_func = async (id) => {

    var resultArray = [];
    var resultObjecta = 'a';
    var resultObject;

    data = await ParkingLot.findById(id)

    data.area.forEach(Melement => {

        const result = this.cal_single_slot_func(Melement.slots, Melement.name, Melement.price, Melement.coordinate_array);
        resultArray.push(result);

    }
    )

    resultArray.forEach(element => {
        resultObjecta = resultObjecta + JSON.stringify(element) + ','
    }
    )

    resultObject = resultObjecta.slice(0, -1);

    resultObject = resultObject.substring(1);

    return resultObject;
}

exports.cal_slot_id_func = async (id) => {
    var Object;
    Object = await this.cal_slot_func(id);

    return Object;
}


exports.check_slot = async (content, parkingID) => {

    let areaArray = content.area;

    let currentPL = await ParkingLot.findById(parkingID).lean();
    let currentArray = currentPL.area;



    for (i = 0; i < areaArray.length; i++) {

        for (j = 0; j < areaArray[i].slots.length; j++) {

            if (areaArray[i].slots[j] != 2 && currentArray[i].slots[j] == 2) {
                areaArray[i].slots[j] = 2;
            }


        }

    }
    content.area = areaArray;


    return content;
}

exports.link_parkinglot_owner = async (parkingID, ownerID) => {

    let content = {
        $addToSet: {
            "ownedParking": parkingID
        }
    }

    await Owner.findOneAndUpdate({ _id: ownerID },
        content, { new: true })

}

exports.unlink_parkinglot_owner = async (parkingID, ownerID) => {

    let content = {
        $pull: {
            "ownedParking": parkingID
        }
    }

    await Owner.findOneAndUpdate({ _id: ownerID },
        content, { new: true })

}

exports.check_slot_single = async (content, parkingID) => {

    let currentPL = await ParkingLot.findById(parkingID).lean();

    for (i = 0; i < currentPL.area.length; i++) {

        if (content.area.name == currentPL.area[i].name) {

            for (j = 0; j < content.area.slots.length; j++) {
                if (content.area.slots[j] != 2 && currentPL.area[i].slots[j] == 2) {
                    content.area.slots[j] = 2;
                }

            }

        }

    }

    return content;
}

exports.getParkinglotName_all = async () => {

    let current_owner_array = await Owner.find().lean().exec();

    for (j = 0; j < current_owner_array.length; j++) {

        current_owner_array[j] = await this.getParkinglotName(current_owner_array[j]._id);

    }

    return current_owner_array;

}

exports.getParkinglotName = async (ownerID) => {

    var parking_lot_name_array_lean = [];
    let current_owner = await Owner.findById(ownerID).lean().exec();
    let parkinglot_ID_array = current_owner.ownedParking;

    if (parkinglot_ID_array.length > 0) {

        let parkinglot_name_array = await ParkingLot.find({ _id: { $in: parkinglot_ID_array } }, { name: 1, _id: 0 }).lean().exec()

        for (i = 0; i < parkinglot_name_array.length; i++) {

            parking_lot_name_array_lean[i] = parkinglot_name_array[i].name;
        }
        current_owner.ownedParkingName = parking_lot_name_array_lean;
    }
    return current_owner;
}

exports.delete_for_owner = async (parkingId) => {

    var bookingID_array = [];


    let booking_array = await bookingfunc.findBookingByParking(parkingId);

    if (booking_array.length > 0) {
        for (let i = 0; i < booking_array.length; i++) {
            bookingID_array[i] = booking_array[i]._id;
        }


        await bookingfunc.clearBookingfromUser(bookingID_array);

        await Booking.deleteMany({ _id: { $in: bookingID_array } }).exec();
    }
    let cur_ownerID = await ParkingLot.find({ _id: parkingId }, { ownerID: 1 })


    await this.unlink_parkinglot_owner(parkingId, cur_ownerID[0].ownerID);

    await ParkingLot.deleteOne({ _id: parkingId })


};

exports.extract_area_from_parkinglot = (parkinglot) => {

    var returnArray = [];
    for (let i = 0; i < parkinglot.area.length; i++) {

        returnArray.push(
            {
                "parkinglotID": parkinglot._id,
                "name": parkinglot.area[i].name,
                "slot_number": parkinglot.area[i].slots.length
            }
        )
    }

    return returnArray;
};

exports.send_update = (area) => {
    
    let current_time = bookingfunc.getTimeMS();
    var slots_array = [];
    for (let k = 0; k < area.slot_number; k++) {
        let o = this.getRandomIntInclusive(0, 1);
        slots_array[k] = o;
    }
    let simulate_edge_id = 'Edge ' + area.name;
    var data = {
        edge_id: simulate_edge_id,
        time: {
            sent: current_time
        },
        area: {
            name: area.name,
            slots: slots_array
        }
    }

    

    fetch('http://localhost:3002/parkinglots/' + area.parkinglotID + '/area/slot', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    return 1;
}

exports.getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

exports.get_test = () => {
    
    fetch('http://localhost:3002/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    return 1;
}
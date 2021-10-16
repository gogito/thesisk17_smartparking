const ParkingLot = require('../models/parkinglot.model.js');
const plfunc = require('../function/parkinglots.function.js');
const bookingfunc = require('../function/booking.function.js');
const Owner = require('../models/owner.model.js');
const Booking = require('../models/booking.model.js');
const Request = require('../models/request.model.js');
var global_request_array = [];
// Create and Save a new ParkingLot
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Parking Lot Name can not be empty"
        });
    }

    if (!req.body.coordinate.latitude) {
        return res.status(400).send({
            message: "Parking Lot Latitude can not be empty"
        });
    }
    if (!req.body.coordinate.longitude) {
        return res.status(400).send({
            message: "Parking Lot Longitude can not be empty"
        });
    }

    if (!req.body.status) {
        return res.status(400).send({
            message: "Parking Lot Status can not be empty"
        });
    }

    if (!req.body.ownerID) {
        return res.status(400).send({
            message: "Parking Lot OwnerID can not be empty"
        });
    }

    if (!req.body.detail_address.number) {
        return res.status(400).send({
            message: "Street Number can not be empty"
        });
    }

    if (!req.body.detail_address.street) {
        return res.status(400).send({
            message: "Street can not be empty"
        });
    }

    if (!req.body.detail_address.district) {
        return res.status(400).send({
            message: "District can not be empty"
        });
    }

    if (!req.body.detail_address.city_province) {
        return res.status(400).send({
            message: "City/Province can not be empty"
        });
    }

    if (!req.body.detail_address.city_province) {
        return res.status(400).send({
            message: "City/Province can not be empty"
        });
    }

    if (!req.body.detail_address.country) {
        return res.status(400).send({
            message: "Country can not be empty"
        });
    }
    let number = req.body.detail_address.number;
    let street = req.body.detail_address.street;
    let district = req.body.detail_address.district;
    let city_province = req.body.detail_address.city_province;
    let country = req.body.detail_address.country;

    let string_address = number + ' ' + street + ' Street, ' + district + ' District, ' + city_province + ', ' + country;
    // Create a Parking Lot
    const parkinglot = new ParkingLot({
        name: req.body.name,
        detail_address: {
            number: req.body.detail_address.number,
            street: req.body.detail_address.street,
            district: req.body.detail_address.district,
            city_province: req.body.detail_address.city_province,
            country: req.body.detail_address.country
        },
        address: string_address,
        coordinate: {
            latitude: req.body.coordinate.latitude,
            longitude: req.body.coordinate.longitude
        },
        status: req.body.status,
        area: req.body.area,
        ownerID: req.body.ownerID
    });

    // Save ParkingLot in the database
    parkinglot.save()
        .then(data => {
            plfunc.link_parkinglot_owner(parkinglot._id, req.body.ownerID);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ParkingLot."
            });
        });

};

// Retrieve and return all Parking from the database.
exports.findAll = (req, res) => {
    ParkingLot.find({ deleted: { $exists: false } })
        .then(parkinglots => {
            res.send(parkinglots);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Parking Lots."
            });
        });
};

// Update a ParkingLot identified by the parkingId in the request
exports.update = async (req, res) => {

    if (req.body.infoArray !== undefined && req.body.info !== undefined) {
        content = {
            $set: req.body.info,
            $addToSet: req.body.infoArray
        }
    }
    else if (req.body.info !== undefined) {
        content = {
            $set: req.body.info
        }
    }

    else {
        content = {
            $addToSet: req.body.infoArray
        }
    }

    await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
        content, { new: true })

    let detail = await ParkingLot.findById(req.params.parkingId);

    let number = detail.detail_address.number;
    let street = detail.detail_address.street;
    let district = detail.detail_address.district;
    let city_province = detail.detail_address.city_province;
    let country = detail.detail_address.country;

    let string_address = number + ' ' + street + ' Street, ' + district + ' District, ' + city_province + ', ' + country;

    content = {
        $set: { "address": string_address }
    }

    await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
        content, { new: true })
        .then(parkinglot => {
            if (!parkinglot) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            res.send(parkinglot);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating Parking Lot with id " + req.params.parkingId
            });
        });
};

// Find a single Parking Lot with a parkingId
exports.findOne = (req, res) => {
    ParkingLot.findById(req.params.parkingId)
        .then(parkinglot => {
            if (!parkinglot) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            res.send(parkinglot);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Parking Lot with id " + req.params.parkingId
            });
        });
};

// Delete a single Parking Lot with a parkingId
exports.delete = async (req, res) => {

    var bookingID_array = [];


    let booking_array = await bookingfunc.findBookingByParking(req.params.parkingId);
    console.log(booking_array);
    if (booking_array.length > 0) {
        for (let i = 0; i < booking_array.length; i++) {
            bookingID_array[i] = booking_array[i]._id;
        }

        let cur_ownerID = await ParkingLot.find({ _id: req.params.parkingId }, { ownerID: 1 })
        // console.log(cur_ownerID[0].ownerID);
        await plfunc.unlink_parkinglot_owner(req.params.parkingId, cur_ownerID[0].ownerID);
        console.log(bookingID_array);
        await Booking.deleteMany({ _id: { $in: bookingID_array } }).exec();
    }

    await ParkingLot.remove({ _id: req.params.parkingId })
    res.send("Parking Lot deleted ");

};

// Delete a single Parking Lot with a parkingId for Owner
exports.delete_for_owner = async (req, res) => {
    let parkingId = req.params.parkingId;

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


    await plfunc.unlink_parkinglot_owner(parkingId, cur_ownerID[0].ownerID);

    await ParkingLot.deleteOne({ _id: parkingId })
    res.send({ message: "Deleted Parkinglot" });

};

// Find all Booking from a Parking Lot with parkingId
exports.get_booking_from_parking = async (req, res) => {

    let booking_array = await bookingfunc.findBookingByParking_all(req.params.parkingId);
    let result_array = await bookingfunc.getName(booking_array);

    // console.log(result_array);
    res.send(result_array);

};

// Add Area in Parkinglot
exports.addArea = async (req, res) => {
    let content = {
        $addToSet: req.body
    }

    await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
        content, { new: true })
        .then(parking => {
            if (!parking) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            // res.send(parkinglot);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating Parking Lot with id " + req.params.parkingId
            });
        });


    var slotResult = await plfunc.cal_slot_id_func(req.params.parkingId)
    slotResult = '[' + slotResult + ']';

    const jsonResult = JSON.parse(slotResult);

    content = {
        $set: { "area": jsonResult }
    }

    await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
        content, { new: true })
        .then(parkinglot => {
            if (!parkinglot) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating Parking Lot with id " + req.params.parkingId
            });
        });



    const result = await plfunc.cal_status_func(req.params.parkingId)

    content = {
        $set: { "status": result }
    }

    ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
        content, { new: true })
        .then(parkinglot => {
            if (!parkinglot) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            res.send(parkinglot);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating Parking Lot with id " + req.params.parkingId
            });
        });
};

// Update area SLOT in a Parkinglot with ParkingId
exports.updateAreaSlot = async (req, res) => {
    const found_index = global_request_array.findIndex(element => element.edge_id == req.body.edge_id)
    if (found_index == -1 ||
        (global_request_array[found_index].edge_id == req.body.edge_id &&
            (parseFloat(req.body.time.sent) >= global_request_array[found_index].time_sent))) {
        // console.log("Received")
        // console.log(req.body);
        // console.log("-------------------------------");
        let received_time = bookingfunc.getTimeMS();

        // Create a Request
        const request = new Request({
            edge_id: req.body.edge_id,
            parkinglotID: req.params.parkingId,
            time: {
                sent: req.body.time.sent,
                received: received_time
            },
            areaName: req.body.area.name,
            slots: req.body.area.slots
        });
        // console.log(request);
        // Save Request in the database
        request.save().catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Request."
            });
        });



        for (i = 0; i < req.body.area.slots.length; i++) {
            if (req.body.area.slots[i] < 0.5) {
                req.body.area.slots[i] = 0;
            }
            else {
                req.body.area.slots[i] = 1;
            }
        }


        let slot_content = await plfunc.check_slot_single(req.body, req.params.parkingId);
        let content = {
            $set: { "area.$.slots": slot_content.area.slots }
        }

        await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId, "area.name": slot_content.area.name }, content, { new: true })
            .then(parking => {

                if (!parking) {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }
                return res.status(500).send({
                    message: "Error updating Parking Lot with id " + req.params.parkingId
                });
            });


        var slotResult = await plfunc.cal_slot_id_func(req.params.parkingId)
        slotResult = '[' + slotResult + ']';

        const jsonResult = JSON.parse(slotResult);

        content = {
            $set: { "area": jsonResult }
        }

        await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
            content, { new: true })
            .then(parkinglot => {
                if (!parkinglot) {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }
                return res.status(500).send({
                    message: "Error updating Parking Lot with id " + req.params.parkingId
                });
            });



        const result = await plfunc.cal_status_func(req.params.parkingId)

        content = {
            $set: { "status": result }
        }

        global_request_array.push(
            // {
            //     "edge_id": req.body.edge_id,
            //     "time_sent": req.body.time.sent
            // }
        )

        ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
            content, { new: true })
            .then(parkinglot => {
                if (!parkinglot) {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }
                res.send(parkinglot);

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Parking Lot not found with id " + req.params.parkingId
                    });
                }
                return res.status(500).send({
                    message: "Error updating Parking Lot with id " + req.params.parkingId
                });
            });
        if (found_index == -1) {
            global_request_array.push(
                {
                    edge_id: req.body.edge_id,
                    time_sent: parseFloat(req.body.time.sent)
                }
            )
        }
        else {

            global_request_array[found_index].time_sent = parseFloat(req.body.time.sent);
        }
    }
    else {
        // console.log("Stale")
        // console.log(req.body)
        // console.log("-------------------------------");
        res.send({
            message: "Stale Request"
        })
    }
};

// Update area SLOT COORDINATE in a Parkinglot with ParkingId
exports.updateAreaSlotCoordinate = async (req, res) => {
    console.log(req.body.area.coordinate_array);


    let content = {
        $set: { "area.$.coordinate_array": req.body.area.coordinate_array }
    }

    await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId, "area.name": req.body.area.name }, content, { new: true })
        .then(parking => {
            res.send(parking)

            if (!parking) {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Parking Lot not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating Parking Lot with id " + req.params.parkingId
            });
        });


};

// Get area SLOT COORDINATE in a Parkinglot with ParkingId
exports.getAreaSlotCoordinate = async (req, res) => {
    let pl = await ParkingLot.findById(req.params.parkingId).lean().exec();
    console.log(pl.area[pl.area.findIndex(element => element.name == req.params.areaName)].coordinate_array)
    res.send(pl.area[pl.area.findIndex(element => element.name == req.params.areaName)].coordinate_array);



};

// Delete Area in Parkinglot
exports.deleteArea = async (req, res) => {

    let bookingArray = await bookingfunc.findCurrentBookingByParkingandArea(req.params.parkingId, req.body.area.name);
    for (ih = 0; ih < bookingArray.length; ih++) {
        // console.log(bookingArray[ih]._id);
        await bookingfunc.cancel_booking(bookingArray[ih]._id);
    }

    await ParkingLot.updateOne({ _id: req.params.parkingId }, { $pull: { area: { name: req.body.area.name } } })

    const result = await plfunc.cal_status_func(req.params.parkingId)


    if (bookingArray.length == 0) {
        let content = {
            $set: { "status": result }
        }

        await ParkingLot.findOneAndUpdate({ _id: req.params.parkingId },
            content, { new: true })

    }
    res.send({ message: "Deleted Area" });
};

// Chage Area Price in Parkinglot
exports.changeAreaPrice = async (req, res) => {

    await ParkingLot.updateOne({ _id: req.params.parkingId, "area.name": req.body.area.name },
        { $set: { "area.$.price": req.body.area.price } },
        { new: true })

    res.send({ message: "Changed Area Price" });
};
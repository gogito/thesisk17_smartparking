const Booking = require('../models/booking.model.js');
const bookingfunc = require('../function/booking.function.js');
const User = require('../models/user.model.js');
const Parkinglot = require('../models/parkinglot.model.js');
const plfunc = require('../function/parkinglots.function.js');




// Create and Save a new Booking
exports.create = (req, res) => {
    let time = bookingfunc.getTime();


    var bookingID;
    // Validate request
    if (!req.body.userID) {
        return res.status(400).send({
            message: "Booking UserID can not be empty"
        });
    }

    if (!req.body.parkinglotID) {
        return res.status(400).send({
            message: "Booking parkinglotID can not be empty"
        });
    }

    if (!req.body.areaName) {
        return res.status(400).send({
            message: "Booking areaName can not be empty"
        });
    }



    let check_currentBooking_promise = bookingfunc.check_currentBooking(req.body.userID);

    check_currentBooking_promise.then((check_currentBooking) => {

        if (check_currentBooking == 0) {
            let check_avail_promise = bookingfunc.check_avail(req.body.parkinglotID, req.body.areaName);
            check_avail_promise.then((check_avail) => {
                if (check_avail > -1) {

                    // Create a Booking
                    const booking = new Booking({
                        userID: req.body.userID,
                        parkinglotID: req.body.parkinglotID,
                        areaName: req.body.areaName,
                        slot_id: check_avail,
                        status: "Booked",
                        created_at: time
                    });

                    // Save Booking in the database
                    const promise1 = booking.save();
                    promise1.then((data) => {
                        bookingID = data._id;
                        res.send(data);
                        User.findOneAndUpdate({ _id: req.body.userID },
                            { $set: { "currentBooking": bookingID } }, { new: true })
                            .then(user => {
                                if (!user) {
                                    return res.status(404).send({
                                        message: "User not found with id " + req.params.userId
                                    });
                                }

                            }).catch(err => {
                                if (err.kind === 'ObjectId') {
                                    return res.status(404).send({
                                        message: "User not found with id " + req.params.userId
                                    });
                                }
                                return res.status(500).send({
                                    message: "Error updating user with id " + req.params.userId
                                });
                            });
                    }
                    )
                    const promise2 = plfunc.cal_status_func(req.body.parkinglotID)
                    promise2.then((result) => {
                        Parkinglot.findOneAndUpdate({ _id: req.body.parkinglotID },
                            { $set: { "status": result } }, { new: true })

                            .then(parkinglot => {

                                if (!parkinglot) {
                                    return res.status(404).send({
                                        message: "Parking Lot not found with id " + req.body.parkinglotID
                                    });
                                }


                            }).catch(err => {
                                if (err.kind === 'ObjectId') {
                                    return res.status(404).send({
                                        message: "Parking Lot not found with id " + req.body.parkinglotID
                                    });
                                }
                                return res.status(500).send({
                                    message: "Error updating Parking Lot with id " + req.body.parkinglotID
                                });
                            });
                    });
                }
                else {
                    res.status(500).send({
                        message: "No booking slots available !!!"
                    });
                }
            })
        }
        else {
            res.status(500).send({
                message: "User already booked !!!"
            });
        }
    })


};

// Retrieve and return all Booking from the database.
exports.findAll = async (req, res) => {
    let bookingArray = await Booking.find().lean();
    let finalArray = await bookingfunc.getName(bookingArray);
    res.send(finalArray);
};

// Find a single booking with a BookingId
exports.findOne = async (req, res) => {

    let currentBooking = await Booking.findById(req.params.bookingId).lean()
    let booking_single_aray = [];
    booking_single_aray[0] = currentBooking;
    let finalArray = await bookingfunc.getName(booking_single_aray);

    res.send(finalArray[0]);

};

// Cancel Booking.
exports.delete = (req, res) => {

    let unbook_promise = bookingfunc.unbook_slot(req.params.bookingID);

    unbook_promise.then((value) => {

        let booking_data_promise = Booking.findOneAndUpdate({ _id: req.params.bookingID },
            { $set: { "status": "Failed" } }, { new: true })

        booking_data_promise.then((booking_data) => {

            let booked_user_data_promise = User.findById(booking_data.userID);

            booked_user_data_promise.then((booked_user_data) => {
                // console.log(booked_user_data);
                booked_user_data.failBooking.push(booked_user_data.currentBooking)
                booked_user_data.currentBooking = '';


                User.findOneAndUpdate({ _id: booking_data.userID },
                    { $set: { "currentBooking": booked_user_data.currentBooking, "failBooking": booked_user_data.failBooking } }, { new: true })
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: "User not found with id " + booking_data.userID
                            });
                        }
                        res.send(user);
                    }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "User not found with id " + booking_data.userID
                            });
                        }
                        return res.status(500).send({
                            message: "Error updating user with id " + booking_data.userID
                        });
                    })
            })
        })
    })
};

// Complete Booking.
exports.put = (req, res) => {

    let unbook_done_promise = bookingfunc.unbook_slot_done(req.params.bookingID);

    unbook_done_promise.then((value) => {

        let booking_data_promise = Booking.findOneAndUpdate({ _id: req.params.bookingID },
            { $set: { "status": "Success" } }, { new: true })

        booking_data_promise.then((booking_data) => {

            let booked_user_data_promise = User.findById(booking_data.userID);

            booked_user_data_promise.then((booked_user_data) => {
          
                booked_user_data.successBooking.push(booked_user_data.currentBooking)
                booked_user_data.currentBooking = '';


                User.findOneAndUpdate({ _id: booking_data.userID },
                    { $set: { "currentBooking": booked_user_data.currentBooking, "successBooking": booked_user_data.successBooking } }, { new: true })
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: "User not found with id " + booking_data.userID
                            });
                        }
                        res.send(user);
                    }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "User not found with id " + booking_data.userID
                            });
                        }
                        return res.status(500).send({
                            message: "Error updating user with id " + booking_data.userID
                        });
                    })
            })
        })
    })
};

// Retrieve and return all Booking from the database.
exports.findAllcurrent = async (req, res) => {


    let bookingArray = await Booking.find({ status: "Booked" }).lean();
    // .then(bookings => {
    //     // res.send(bookings);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving Bookings."
    //     });
    // });
    let finalArray = await bookingfunc.getName(bookingArray);
    res.send(finalArray);
};
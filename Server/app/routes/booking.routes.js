module.exports = (app) => {
    const bookings = require('../controllers/booking.controller.js');
    const rateLimit = require("express-rate-limit");
    const queue = require('./share.js')

    // const queue = require('express-queue');
    // const bookingLimiter = rateLimit({
    //     windowMs: 5*1000, // 5 minutes window
    //     max: 1, // start blocking after 5 requests
    //     message: {
    //         message: "Too many booking created from this User, please try again after 5 seconds",
    //     },
    //     keyGenerator: function (req /*, res*/) {
    //         return req.body.userID;
    //     }
    // });

    /**
     * @swagger
     * components:
     *   schemas:
     *     Booking:
     *       type: object
     *       required:
     *         - userID
     *         - parkinglotID
     *         - areaName
     *         - slot_id
     *         - status
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the booking
     *         userID:
     *           type: string
     *           description: The user ID of the booked User
     *         parkinglotID:
     *           type: string
     *           description: The ID of the booked parkinglot
     *         areaName:
     *           type: string
     *           description: The name of the Area in the parkinglot that was booked
     *         slot_id:
     *           type: string
     *           description: The slot id of the area
     *         status:
     *           type: string
     *           description: The booking status
     *      
     *        
     */




    /**
     * @swagger
     * tags:
     *   name: Bookings
     *   description: The Bookings managing API
     */


    // Retrieve all Booking

    /**
     * @swagger
     * /bookings:
     *   get:
     *     summary: Returns the list of all the bookings
     *     tags: [Bookings]
     *     responses:
     *       200:
     *         description: The list of the bookings
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Booking'
     */

    app.get('/bookings', bookings.findAll);

    // Retrieve One Booking

    /**
     * @swagger
     * /bookings/{id}:
     *   get:
     *     summary: Get the booking by id
     *     tags: [Bookings]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The booking id
     *     responses:
     *       200:
     *         description: The booking description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       404:
     *         description: The booking was not found
     */


    app.get('/bookings/:bookingId', bookings.findOne);

    // Add new Booking

    /**
     * @swagger
     * /bookings:
     *   post:
     *     summary: Make a new booking
     *     tags: [Bookings]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:            
     *              userID:
     *                type: string
     *              parkinglotID:
     *                type: string
     *              areaName:
     *                type: string
     *     responses:
     *       200:
     *         description: The bookingr description by id after booked
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       404:
     *         description: Could not book
     */



    app.post('/bookings', queue({ activeLimit: 1, queuedLimit: -1 }), bookings.create);

    // Cancel Booking

    /**
     * @swagger
     * /bookings/{id}:
     *   delete:
     *     summary: Cancel the booking by id
     *     tags: [Bookings]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The booking id
     *     responses:
     *       200:
     *         description: The user description of the user that cancelled the booking
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       404:
     *         description: The booking was not found
     */


    app.delete('/bookings/:bookingID', queue({ activeLimit: 1, queuedLimit: -1 }), bookings.delete);

    // Complete Booking

    /**
     * @swagger
     * /bookings/{id}:
     *   put:
     *     summary: Complete the booking by id
     *     tags: [Bookings]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The booking id
     *     responses:
     *       200:
     *         description: The user description of the user that completed the booking
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Booking'
     *       404:
     *         description: The booking was not found
     */


    app.put('/bookings/:bookingID', queue({ activeLimit: 1, queuedLimit: -1 }), bookings.put);


    // Retrieve all CURRENT Bookings

    /**
     * @swagger
     * /currentbookings:
     *   get:
     *     summary: Returns the list of all the bookings current Booked
     *     tags: [Bookings]
     *     responses:
     *       200:
     *         description: The list of the bookings
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Booking'
     */

    app.get('/currentbookings', bookings.findAllcurrent);



}
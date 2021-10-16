module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    /**
     * @swagger
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - username
     *         - password
     *         - userType
     *         - personalID
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the user
     *         name:
     *           type: object
     *           description: The user Name
     *           properties:
     *              FName:
     *                  type: string
     *              LName:
     *                  type: string
     *         email:
     *           type: string
     *           description: The user Email
     *         username:
     *           type: string
     *           description: The user Username
     *         password:
     *           type: string
     *           description: The user Password
     *         personalID:
     *           type: string
     *           description: The user personalID
     *         carplateNumber:
     *           type: array
     *           items:
     *              type: string
     *           uniqueItems: true
     *           description: The user carplate Number
     *         successBooking:
     *           type: array
     *           items:
     *              type: string
     *           uniqueItems: true
     *           description: The user Success Booking
     *         failBooking:
     *           type: array
     *           items:
     *              type: string
     *           uniqueItems: true
     *           description: The user Fail Booking
     *         currentBooking:
     *           type: string
     *           description: The user currentBooking    
     *        
     */




 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The Users managing API
  */

    // Retrieve all Users

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


    app.get('/users', users.findAll);

    // Retrieve a single User with userId

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */


    app.get('/users/:userId', users.findOne);

    // Update a User with userId

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *              info:
 *                type: object
 *                description: Data NOT in an Array
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  name:
 *                    type: object
 *                    properties:
 *                      FName:
 *                        type: string
 *                      LName:
 *                        type: string
 *              infoArray:
 *                type: object
 *                description: Data in an Array
 *                properties:
 *                  carplateNumber:
 *                    type: string
 *     responses:
 *       200:
 *         description: The user description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */




    app.put('/users/:userId', users.update);

    // Delete a User with userId
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User deleted successfully!
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

    app.delete('/users/:userId', users.delete);

        // Find all booking from userID
/**
 * @swagger
 * /users/{id}/booking:
 *   get:
 *     summary: Find all booking from userID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Booking detail
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The user was not found
 */
 app.get('/users/:userId/booking', users.find_booking_by_userID);


    // Retrieve all Users that is not currently Booked

/**
 * @swagger
 * /usersfree:
 *   get:
 *     summary: Returns the list of all the users not booked
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


 app.get('/usersfree', users.findAllnotBooked);



}
module.exports = (app) => {
    const owners = require('../controllers/owner.controller.js');


 /**
     * @swagger
     * components:
     *   schemas:
     *     Owner:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - username
     *         - password
     *         - userType
     *         - ownedParking
     *         - personalID
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the owner
     *         name:
     *           type: object
     *           description: The owner Name
     *           properties:
     *              FName:
     *                  type: string
     *              LName:
     *                  type: string
     *         email:
     *           type: string
     *           description: The owner Email
     *         personalID:
     *           type: string
     *           description: The owner Personal ID
     *         username:
     *           type: string
     *           description: The owner Username
     *         password:
     *           type: string
     *           description: The owner Password
     *         ownedParking:
     *           type: array
     *           items:
     *              type: string
     *           uniqueItems: true
     *           description: The Owner's Parkinglots ID 
     *        
     */




 /**
  * @swagger
  * tags:
  *   name: Owners
  *   description: The Owners managing API
  */

       // Register a new Owner

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Add a new Owner
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *              name:
 *                type: object
 *                properties:
 *                  FName:
 *                    type: string
 *                  LName:
 *                    type: string
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *              personalID:
 *                type: string
 *     responses:
 *       200:
 *         description: The owner description by id after created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Could not create Owner
 */ 
    app.post('/owners', owners.create);

    // Retrieve all Owners

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Returns the list of all the owners
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: The list of the owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 */
    app.get('/owners', owners.findAll);



    // Retrieve a single Owner with ownerId

/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Get the owner by id
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: The owner description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: The owner was not found
 */

    app.get('/owners/:ownerId', owners.findOne);



    // Update a User with userId

/**
 * @swagger
 * /owners/{id}:
 *   put:
 *     summary: Update the owner by id
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
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
 *                  ownedParking:
 *                    type: string
 *     responses:
 *       200:
 *         description: The owner description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: The user was not found
 */
    app.put('/owners/:ownerId', owners.update);



    // Delete a owner with ownerId
/**
 * @swagger
 * /owners/{id}:
 *   delete:
 *     summary: Delete the owner by id
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: User deleted successfully!
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: The owner was not found
 */
    app.delete('/owners/:ownerId', owners.delete);



    // Find all booking from ownerID
/**
 * @swagger
 * /owners/{id}/booking:
 *   get:
 *     summary: Find all booking from ownerID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: Booking detail
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The owner was not found
 */
 app.get('/owners/:ownerId/booking', owners.find_booking_by_ownerID);



    // Find all parking from ownerID
/**
 * @swagger
 * /owners/{id}/parking:
 *   get:
 *     summary: Find all parking from ownerID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: Parkinglot detail
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The owner was not found
 */
 app.get('/owners/:ownerId/parking', owners.find_parking_by_ownerID);

}
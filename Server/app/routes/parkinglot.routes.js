module.exports = (app) => {
    const parkinglots = require('../controllers/parkinglot.controller.js');
    const cal_coor = require('../function/coordinate.function.js');
    const queue = require('./share.js')
        /**
     * @swagger
     * components:
     *   schemas:
     *     Parkinglot:
     *       type: object
     *       required:
     *         - name
     *         - coordinate
     *         - address
     *         - detail_address
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the parkinglot
     *         coordinate:
     *           type: object
     *           description: The Parkinglot Coordinate
     *           properties:
     *              latitude:
     *                  type: string
     *              longitude:
     *                  type: string
     *         name:
     *           type: string
     *           description: The Parkinglot Name
     *         detail_address:
     *           type: object
     *           description: The Parkinglot Detailed Address
     *           properties:
     *              number:
     *                  type: string
     *              street:
     *                  type: string     
     *              district:
     *                  type: string
     *              city_province:
     *                  type: string   
     *              country:
     *                  type: string     
     *         status:
     *           type: string
     *           description: The Parkinglot Status
     *         address:
     *           type: string
     *           description: The Parkinglot Address
     *         image:
     *           type: string
     *           description: The Parkinglot Image
     *         ownerID:
     *           type: string
     *           description: The Parkinglot OwnerID
     *         area:
     *           type: array
     *           items:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *                price:
     *                  type: string
     *                fullslot:
     *                  type: string
     *                freeslot:
     *                  type: string
     *                slots:
     *                  type: array
     *                  items:
     *                    type: integer
     *           description: The Parkinglot Area Info
     *   
     */




 /**
  * @swagger
  * tags:
  *   name: Parkinglots
  *   description: The Parkinglots managing API
  */

    // Register a new ParkingLot


/**
 * @swagger
 * /parkinglots:
 *   post:
 *     summary: Add a new Parkinglot
 *     tags: [Parkinglots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parkinglot'
 *     responses:
 *       200:
 *         description: The parkinglot description by id after created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: Could not create Parkinglot
 */        


    app.post('/parkinglots', parkinglots.create);

    // Retrieve all Parkinglots

/**
 * @swagger
 * /parkinglots:
 *   get:
 *     summary: Returns the list of all the parkinglots
 *     tags: [Parkinglots]
 *     responses:
 *       200:
 *         description: The list of the parkinglots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parkinglot'
 */

    app.get('/parkinglots', parkinglots.findAll);

    // Calculate Distance


/**
 * @swagger
 * /cal_coor:
 *   post:
 *     summary: Find parkinglot near specified coordinate
 *     tags: [Parkinglots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:            
 *              current:
 *                type: object
 *                properties:
 *                  latitude:
 *                    type: string
 *                  longitude:
 *                    type: string
 *              radius:
 *                type: string
 *     responses:
 *       200:
 *         description: The parkinglots matching conditions
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: Could not find Parkinglot in radius
 */   

    app.post('/cal_coor', cal_coor.cal_distance);

    // Update a Parking with ParkingId

/**
 * @swagger
 * /parkinglots/{id}:
 *   put:
 *     summary: Update the Parkinglot by id
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
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
 *                  name:
 *                    type: string
 *                  address:
 *                    type: string
      *         detail_address:
     *           type: object
     *           description: The Parkinglot Detailed Address
     *           properties:
     *              number:
     *                  type: string
     *              street:
     *                  type: string     
     *              district:
     *                  type: string
     *              city_province:
     *                  type: string   
     *              country:
     *                  type: string      
 *                  coordinate:
 *                    type: object
 *                    properties:
 *                      latitude:
 *                        type: string
 *                      longitude:
 *                        type: string
 *                  area:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        price:
 *                          type: string
 *                        slots:
 *                          type: array
 *                          items:
 *                            type: integer
 *                 
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


    app.put('/parkinglots/:parkingId', parkinglots.update);

    // Retrieve a single Parking Lot with parkingId

/**
 * @swagger
 * /parkinglots/{id}:
 *   get:
 *     summary: Get the parkinglot by id
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The parkinglot id
 *     responses:
 *       200:
 *         description: The parkinglot description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The parkinglot was not found
 */

    app.get('/parkinglots/:parkingId', parkinglots.findOne);


    // Delete a single Parking Lot with parkingId

/**
 * @swagger
 * /parkinglots/{id}:
 *   delete:
 *     summary: Delete the parkinglot by id
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The parkinglot id
 *     responses:
 *       200:
 *         description: The parkinglot description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The parkinglot was not found
 */



app.delete('/parkinglots/:parkingId', parkinglots.delete_for_owner);


    // Find all Booking from a Parking Lot with parkingId

/**
 * @swagger
 * /parkinglots/{id}/booking:
 *   get:
 *     summary: Find all Booking from a Parking Lot with parkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The parkinglot id
 *     responses:
 *       200:
 *         description: The booking detail description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The parkinglot was not found
 */

 app.get('/parkinglots/:parkingId/booking', parkinglots.get_booking_from_parking);
 

    // Add area in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area:
 *   put:
 *     summary: Add area in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                    area:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        price:
 *                          type: string
 *                        slots:
 *                          type: array
 *                          items:
 *                            type: integer
 *                 
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.put('/parkinglots/:parkingId/area', parkinglots.addArea);


    // Update area SLOT in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area/slot:
 *   put:
 *     summary: Update area SLOT in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                    edge_id:
 *                     type: string
 *                    time:
 *                     type: object
 *                     properties:
 *                         sent:
 *                          type: string
 *                    area:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        slots:
 *                          type: array
 *                          items:
 *                            type: integer
 *      
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.put('/parkinglots/:parkingId/area/slot', queue({ activeLimit: 1, queuedLimit: -1 }), parkinglots.updateAreaSlot);


     // Update area SLOT COORDINATE in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area/slot/coordinate:
 *   put:
 *     summary: Update area SLOT COORDINATE in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                    area:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        coordinate_array:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: string
 *                              point_array:
 *                                type: array
 *                                items:
 *                                  type: integer
 *                              
 *      
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.put('/parkinglots/:parkingId/area/slot/coordinate', parkinglots.updateAreaSlotCoordinate);


    // Get area SLOT COORDINATE in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area/slot/coordinate/{areaName}:
 *   get:
 *     summary: Get area SLOT COORDINATE in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
  *       - in: path
 *         name: areaName
 *         schema:
 *           type: string
 *         required: true
 *         description: The area name
 *  
 *                              
 *      
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.get('/parkinglots/:parkingId/area/slot/coordinate/:areaName', parkinglots.getAreaSlotCoordinate);



    // Add area in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area:
 *   delete:
 *     summary: Delete an area in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                    area:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                       
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.delete('/parkinglots/:parkingId/area', parkinglots.deleteArea);


    // Add area in a Parkinglot with ParkingId

/**
 * @swagger
 * /parkinglots/{id}/area/price:
 *   put:
 *     summary: Change an area Price in a Parkinglot with ParkingId
 *     tags: [Parkinglots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Parkinglot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                    area:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        price:
 *                          type: string
 *                       
 *     responses:
 *       200:
 *         description: The Parkinglot description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parkinglot'
 *       404:
 *         description: The Parkinglot was not found
 */


 app.put('/parkinglots/:parkingId/area/price', parkinglots.changeAreaPrice);

}
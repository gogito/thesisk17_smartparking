module.exports = (app) => {
    const test = require('../controllers/test.controller.js');

    /**
     * @swagger
     * components:
     *   schemas:
     *     Area:
     *       type: object
     *       required:
     *         - name
     *         - slot_number
     *         - parkinglotID
     *       properties:
     *         name:
     *           type: string
     *           description: The Area Name
     *         slot_number:
     *           type: string
     *           description: The Area Slot Number
     *         parkinglotID:
     *           type: string
     *           description: The Area Parkinglot ID  
     */

 /**
  * @swagger
  * tags:
  *   name: Tests
  *   description: The Tests managing API
  */

    // Retrieve Area info for testing

/**
 * @swagger
 * /test/areaname:
 *   get:
 *     summary: Returns the list of all the Area
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: The list of the areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */

    // Get parkinglot area information for update
    app.get('/test/areaname', test.getAreainfo);

    

    // Simulate multiple Edge 

/**
 * @swagger
 * /test/simulate-edge:
 *   get:
 *     summary: Start sending update to area to simulate multiple edge devices
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Started process
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */

    // Get parkinglot area information for update
    app.get('/test/simulate-edge', test.simulate_edge);

    
    // Simulate multiple Edge 

/**
 * @swagger
 * /test/simulate-edge:
 *   get:
 *     summary: Start sending update to area to simulate multiple edge devices
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Started process
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */

    // Get parkinglot area information for update
    app.get('/test/simulate-edge', test.simulate_edge);


}
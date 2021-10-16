module.exports = (app) => {
    const others = require('../controllers/other.controller.js');

 /**
  * @swagger
  * tags:
  *   name: Other
  *   description: Other APIs
  */
    // Retrieve routing

/**
 * @swagger
 * /other/routing/{curLong}/{curLat}/{desLong}/{desLat}:
 *   get:
 *     summary: Get routing with Coordinate
 *     tags: [Other]
 *     parameters:
 *       - in: path
 *         name: curLong
 *         schema:
 *           type: string
 *         required: true
 *         description: The current Longitude
 *       - in: path
 *         name: curLat
 *         schema:
 *           type: string
 *         required: true
 *         description: The current Latitude
 *       - in: path  
 *         name: desLong
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination Longitude
 *       - in: path  
 *         name: desLat
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination Latitude
 *     responses:
 *       200:
 *         description: The routing object
 *         contens:
 *           application/json:
 *             
 *       404:
 *         description: The user was not found
 */



    app.get('/other/routing/:curLong/:curLat/:desLong/:desLat', others.routing);



    // Search

/**
 * @swagger
 * /other/search/{keyword}:
 *   get:
 *     summary: Get result with keyword
 *     tags: [Other]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword
 *     responses:
 *       200:
 *         description: The result
 *         contens:
 *           application/json:
 *             
 *       404:
 *         description: The result was not found
 */

    
    app.get('/other/search/:keyword', others.search);

  
}
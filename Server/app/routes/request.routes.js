module.exports = (app) => {
    const requests = require('../controllers/request.controller.js');

    /**
     * @swagger
     * components:
     *   schemas:
     *     Request:
     *       type: object
     *       required:
     *         - areaName
     *         - edge_id
     *         - parkinglotID
     *         - time
     *         - slots
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the request
     *         time:
     *           type: object
     *           description: The request time
     *           properties:
     *              sent:
     *                  type: string
     *              received:
     *                  type: string
     *         parkinglotID:
     *           type: string
     *           description: The request Parkinglot ID
     *         areName:
     *           type: string
     *           description: The request Area
     *         slots:
     *           type: array
     *           items:
     *              type: integer
     *           description: The slots
     */

/**
  * @swagger
  * tags:
  *   name: Requests
  *   description: The Requests managing API
  */
    // Retrieve all Requests

    /**
 * @swagger
 * /requests:
 *   get:
 *     summary: Returns the list of all the requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: The list of the requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */
    app.get('/requests', requests.findAll);

    // Retrieve all Requests

    /**
 * @swagger
 * /requests/total:
 *   get:
 *     summary: Returns the total number of requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: The total number of the requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */
     app.get('/requests/total', requests.getTotal);


    // Get request count

    /**
 * @swagger
 * /requests/count:
 *   get:
 *     summary: Returns the count of requests based on Edge_ID and Parkinglot_ID
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: The count of the requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */
     app.get('/requests/count', requests.getCountFast);

    // Get request count for specific owner

    /**
 * @swagger
 * /requests/count/{ownerID}:
 *   get:
 *     summary: Returns the count of requests based on Edge_ID and Parkinglot_ID for specific OWNER
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: ownerID
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: The count of the requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */
     app.get('/requests/count/:ownerID', requests.getCountOwnerFast);
}
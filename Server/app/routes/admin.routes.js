module.exports = (app) => {
    const admins = require('../controllers/admin.controller.js');
 /**
     * @swagger
     * components:
     *   schemas:
     *     Admin:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - username
     *         - password
     *       properties:
     *         _id:
     *           type: string
     *           description: The auto-generated id of the admin
     *         name:
     *           type: object
     *           description: The admin Name
     *           properties:
     *              FName:
     *                  type: string
     *              LName:
     *                  type: string
     *         email:
     *           type: string
     *           description: The admin Email
     *         username:
     *           type: string
     *           description: The admin Username
     *         password:
     *           type: string
     *           description: The admin Password
     *          
     *        
     */

/**
  * @swagger
  * tags:
  *   name: Admins
  *   description: The Admins managing API
  */
    // Retrieve all Admins

    /**
 * @swagger
 * /admins:
 *   get:
 *     summary: Returns the list of all the admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */
    app.get('/admins', admins.findAll);

    // Retrieve a single Admin with userId
/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get the admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: The admin description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The user was not found
 */

    app.get('/admins/:userId', admins.findOne);

    // Update a Admin with userId

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update the admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
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
 *     responses:
 *       200:
 *         description: The user description by id after update
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 */

    app.put('/admins/:userId', admins.update);

    // Delete a Admin with userId

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete the admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: Admin deleted successfully!
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 */

    app.delete('/admins/:userId', admins.delete);
}
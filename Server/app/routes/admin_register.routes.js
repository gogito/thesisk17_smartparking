module.exports = (app) => {
    const admin_register = require('../controllers/admin_register.controller.js');
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




    // Register a new admin

/**
 * @swagger
 * /admin_register:
 *   post:
 *     summary: Add a new Admin
 *     tags: [Admins]
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
 *     responses:
 *       200:
 *         description: The admin description by id after created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Could not create Admin
 */
    // Add a new admin
    app.post('/admin_register', admin_register.create);
}
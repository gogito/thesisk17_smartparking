module.exports = (app) => {
    const login = require('../controllers/admin_login.controller.js');
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


    // Retrieve a single Admin with username and password

/**
 * @swagger
 * /admin_login:
 *   post:
 *     summary: Admin Login
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:            
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: The admin description by id after login
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Could not find Admin with matching Username and Password
 */   

    app.post('/admin_login', login.findOne);
}
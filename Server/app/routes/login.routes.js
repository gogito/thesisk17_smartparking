module.exports = (app) => {
    const login = require('../controllers/login.controller.js');
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



    // Retrieve a single User with username and password

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Users]
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
 *         description: The user description by id after login
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Could not find User with matching Username and Password
 */    

    app.post('/login', login.findOne);
}
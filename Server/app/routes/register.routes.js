module.exports = (app) => {
    const register = require('../controllers/register.controller.js');
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




    // Register a new user

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Add a new User (Register)
 *     tags: [Users]
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
 *         description: The user description by id after created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Could not create User
 */    
    app.post('/register', register.create);
}
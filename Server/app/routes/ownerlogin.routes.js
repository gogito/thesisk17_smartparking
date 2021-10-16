module.exports = (app) => {
    const ownerlogin = require('../controllers/ownerlogin.controller.js');

    // Retrieve a single User with username and password

/**
 * @swagger
 * /ownerlogin:
 *   post:
 *     summary: Login
 *     tags: [Owners]
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
 *         description: The owner description by id after login
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Could not find Owner with matching Username and Password
 */    
    app.post('/ownerlogin', ownerlogin.findOne);


  
}
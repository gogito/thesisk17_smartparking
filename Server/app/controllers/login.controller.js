const User = require('../models/user.model.js');

// Verify Username + Password and return JSON object
exports.findOne = (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with username " + req.body.username + " and password " + req.body.password
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with username " + req.body.username + " and password " + req.body.password
            });                
        }
        return res.status(500).send({
            message: "User not found with username " + req.body.username + " and password " + req.body.password
        });
    });
};



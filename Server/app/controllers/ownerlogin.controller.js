const Owner = require('../models/owner.model.js');

// Verify Username + Password and return JSON object
exports.findOne = (req, res) => {
    Owner.findOne({username: req.body.username, password: req.body.password})
    .then(owner => {
        if(!owner) {
            return res.status(404).send({
                message: "Owner not found with username " + req.body.username + " and password " + req.body.password
            });            
        }
        res.send(owner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Owner not found with username " + req.body.username + " and password " + req.body.password
            });                
        }
        return res.status(500).send({
            message: "Owner not found with username " + req.body.username + " and password " + req.body.password
        });
    });
};



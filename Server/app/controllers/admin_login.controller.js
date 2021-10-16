const Admin = require('../models/admin.model.js');

// Verify Username + Password and return JSON object
exports.findOne = (req, res) => {
    Admin.findOne({username: req.body.username, password: req.body.password})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with username " + req.body.username + " and password " + req.body.password
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with username " + req.body.username + " and password " + req.body.password
            });                
        }
        return res.status(500).send({
            message: "Admin not found with username " + req.body.username + " and password " + req.body.password
        });
    });
};



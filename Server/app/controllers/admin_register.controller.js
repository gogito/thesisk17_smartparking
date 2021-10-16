const Admin = require('../models/admin.model.js');

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.password) {
        return res.status(400).send({
            message: "Admin Password can not be empty"
        });
    }

    if(!req.body.name.FName) {
        return res.status(400).send({
            message: "First Name can not be empty"
        });
    }
    if(!req.body.name.LName) {
        return res.status(400).send({
            message: "Last Name can not be empty"
        });
    }

    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }

    if(!req.body.username) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }

   

   

    // Create a Admin
    const admin = new Admin({
        username: req.body.username, 
        password: req.body.password,
        name: {
            FName: req.body.name.FName,
            LName: req.body.name.LName
        },
        email: req.body.email
    });

    // Save Admin in the database
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Admin."
        });
    });
};


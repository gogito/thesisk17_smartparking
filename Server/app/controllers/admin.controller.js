const Admin = require('../models/admin.model.js');

// Retrieve and return all admins from the database.
exports.findAll = (req, res) => {
    Admin.find()
        .then(admins => {
            res.send(admins);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving admins."
            });
        });
};

// Find a single admin with a UserId
exports.findOne = (req, res) => {
    Admin.findById(req.params.userId)
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            res.send(admin);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving admin with id " + req.params.userId
            });
        });
};

// Update a admin identified by the userId in the request
exports.update = (req, res) => {
    // Find admin and update it with the request body
    let content = "400";
    if (req.body.infoArray !== undefined) {
        content = {
            $set: req.body.info,
            $addToSet: req.body.infoArray
        }
    }
    else {
        content = {
            $set: req.body.info
        }
    }

    Admin.findOneAndUpdate({ _id: req.params.userId },
        content, { new: true })
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            res.send(admin);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating admin with id " + req.params.userId
            });
        });
};

// Delete a admin with the specified userId in the request
exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.userId)
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            res.send({ message: "Admin deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete admin with id " + req.params.userId
            });
        });
};

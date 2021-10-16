const Request = require('../models/request.model.js');
const Parkinglot = require('../models/parkinglot.model.js');
// Retrieve and return all requests from the database.
exports.findAll = (req, res) => {
    Request.find().lean()
        .then(requests => {
            res.send(requests);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving requests."
            });
        });
};

// Return total number of request
exports.getTotal = (req, res) => {
    Request.find().lean()
        .then(requests => {
            res.send({ total_request: requests.length });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving requests."
            });
        });
};

// Return count of request
exports.getCountFast = async (req, res) => {
    var total_edge_id_array = [];
    var total_parkinglot_array = [];
    var promise1 = Request.find({}, { slots: 0, areaName: 0, time: 0, _id: 0 }).lean().exec();
    var promise2 = Parkinglot.find({}, { name: 1 }).lean().exec();
    await Promise.all([promise1, promise2]).then(function (value) {

        let request_array = JSON.parse(JSON.stringify(value[0]));
        let parkinglot_array = JSON.parse(JSON.stringify(value[1]));

        for (let i = 0; i < parkinglot_array.length; i++) {
            total_parkinglot_array.push(
                {
                    "parkinglotID": parkinglot_array[i]._id,
                    "name": parkinglot_array[i].name,
                    "count": 0
                }
            )
        }
        for (let i = 0; i < request_array.length; i++) {
            total_parkinglot_array[total_parkinglot_array.findIndex(element => element.parkinglotID == request_array[i].parkinglotID)].count += 1;
            let e = total_edge_id_array.findIndex(element => element.edge_id == request_array[i].edge_id);
            if (e == -1) {
                total_edge_id_array.push(
                    {
                        "edge_id": request_array[i].edge_id,
                        "count": 1
                    }
                )
            }
            else {
                total_edge_id_array[e].count += 1;
            }
        }
        res.send(
            {
                "total_request": request_array.length,
                total_edge_id_array,
                total_parkinglot_array
            }
        )
    });
};

// Return count of request for specific owner
exports.getCountOwnerFast = async (req, res) => {
    var total_edge_id_array = [];
    var total_parkinglot_array = [];
    var parkinglot_id_array = [];
    let parkinglot_array = JSON.parse(JSON.stringify(await Parkinglot.find({ ownerID: req.params.ownerID }, { name: 1 }).lean().exec()));
    for (i = 0; i < parkinglot_array.length; i++) {

        parkinglot_id_array[i] = parkinglot_array[i]._id

    }
    let request_array = JSON.parse(JSON.stringify(await Request.find({ parkinglotID: { $in: parkinglot_id_array } }).lean().exec()));

    for (let i = 0; i < parkinglot_array.length; i++) {
        total_parkinglot_array.push(
            {
                "parkinglotID": parkinglot_array[i]._id,
                "name": parkinglot_array[i].name,
                "count": 0
            }
        )
    }
    for (let i = 0; i < request_array.length; i++) {
        let u = total_parkinglot_array.findIndex(element => element.parkinglotID == request_array[i].parkinglotID);
        total_parkinglot_array[u].count = total_parkinglot_array[u].count + 1;
        let e = total_edge_id_array.findIndex(element => element.edge_id == request_array[i].edge_id);
        if (e == -1) {
            total_edge_id_array.push(
                {
                    "edge_id": request_array[i].edge_id,
                    "count": 1
                }
            )
        }
        else {
            total_edge_id_array[e].count = total_edge_id_array[e].count + 1;
        }
    }
    res.send(
        {
            "total_request": request_array.length,
            total_edge_id_array,
            total_parkinglot_array
        }
    )

};


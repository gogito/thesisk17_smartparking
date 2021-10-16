const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const queue = require('express-queue');
const requestCapture = require ('express-request-capture');
var printAdapter = { channel: console};

// create express app
const app = express();

app.use(queue({ activeLimit: 1, queuedLimit: 999999999 }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// parse application/json
app.use(bodyParser.json())
// app.use(requestCapture(printAdapter));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("BKPark Server successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
mongoose.set('useFindAndModify', false);
// Swagger API Doc
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
		info: {
			title: "BKPark API",
			version: "1.0.0",
			description: "BKPark Smart Parking API",
		},
		servers: [
			{
				url: "http://bkparking.ddns.net:3002",
			},
            {
				url: "http://localhost:3002",
			},
		],
	},
	apis: ["./app/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// User Route
require('./app/routes/user.routes.js')(app);
require('./app/routes/register.routes.js')(app);
require('./app/routes/login.routes.js')(app);

// Parking Lot Route
require('./app/routes/parkinglot.routes.js')(app);

// Booking Route
require('./app/routes/booking.routes.js')(app);

// Other Route
require('./app/routes/note.routes.js')(app);
require('./app/routes/test.routes.js')(app);
require('./app/routes/other.routes.js')(app);

// Admin Route
require('./app/routes/admin.routes.js')(app);
require('./app/routes/admin_login.routes.js')(app);
require('./app/routes/admin_register.routes.js')(app);

// Owner Route
require('./app/routes/ownerlogin.routes.js')(app);
require('./app/routes/owner.routes.js')(app);

//Request Route
require('./app/routes/request.routes.js')(app);

// Listen for requests
app.listen(3002, () => {
    console.log("BKPark Server is listening on port 3002");
});

// app.listen(process.env.PORT || 3002)
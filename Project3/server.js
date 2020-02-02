// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

// Use cors
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, listening);

function listening() {
    console.log(`Server started at port: ${port}`);
}

// GET route
app.get('/getWeather', getData);

function getData(req, res) {
    console.log('Project Data : ', projectData);
    projectData.currentTemp = toCelsius(projectData.currentTemp).toFixed(1);
    projectData.feelsLike = toCelsius(projectData.feelsLike).toFixed(1);
    res.send(projectData);
}

// POST route
app.post('/addZip', addZip);

function addZip(req, res) {
    console.log("Request body - ", req.body);
    projectData = req.body;
    res.send(projectData);
}

// Helper functions
/* to celsius from Kelvin */
function toCelsius(temp) {
    return temp - 273;
}
// Setup empty JS object to act as endpoint for all routes
//projectData = {};
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 1234;

// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log('Server running');
    console.log(`running on localhost: ${port}`);
};

// POST ROUTE

app.post('/addWeatherData', addWeatherData);

function addWeatherData(req, res) {
    //console.log("Printing Weather Data to be added to the array");
    //console.log("Got here to post data");
    console.log("Printing the weather data to be added from body");
    console.log(req.body);
    newEntry = {
        temp: req.body.temp,
        pressure: req.body.pressure,
        feelings: req.body.feelings
    }
    projectData.push(newEntry);
    // console.log("Printing Project Data...");
    // console.log(projectData);
    console.log("Project Data is: ");
    console.log("Temperature: " + projectData.temp + " Pressure: " + projectData.pressure + " Feelings: " + projectData.feelings);
    res.send(projectData);
}

app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
    console.log("Printing Project in a call to all...");
    console.log(projectData);
}
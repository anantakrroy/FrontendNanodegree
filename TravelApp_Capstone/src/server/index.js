// Setup empty JS object to act as endpoint for all routes
const projectData = [];
const travelPlanner = {};

// Require Express to run server and routes
const express = require('express');
const request = require('request');
const https = require('https');
const util = require('util');
const DarkSky = require('dark-sky');
const moment = require('moment');
const pixabay = require('pixabay-api');
const dotenv = require('dotenv');
dotenv.config();

const PixabayApi = require('node-pixabayclient');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middlewares*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin resources support
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Initialize the main project folder
app.use(express.static('dist'));

const port = 8080;

// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log('Server running');
    console.log(`running on localhost: ${port}`);
};

app.get('/user', function (req, res) {
    res.status(200).json({ name: 'Ananta' });
});

app.post('/getWeather', async (req, res, next) => {
    const travelPlanner = [];
    let low = '';
    let high = '';
    let latitude = req.body.lat;
    let longitude = req.body.lng;
    let location = req.body.location;
    let departureDate = req.body.date;
    let endDate = req.body.endDate;
    console.log("Departure Date is: " + departureDate);
    var dateLiterals = departureDate.split("/");
    var dateLiterals2 = endDate.split("/");

    let year = dateLiterals[2];
    let month = dateLiterals[0];
    let day = dateLiterals[1];

    let endYear = dateLiterals2[2];
    let endMonth = dateLiterals2[0];
    let endDay = dateLiterals2[1];

    //Convert month to number and subtract one
    let monthInNum = parseInt(month);
    let properMonth = monthInNum - 1;

    let endMonthInNum = parseInt(endMonth);
    let endProperMonth = endMonthInNum - 1;

    let target = new Date(year, properMonth, day);

    let tripFinalDate = new Date(endYear, endProperMonth, endDay);

    let today = new Date();

    let nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    let theTime = year + '-' + monthInNum + '-' + day;

    let diff = (target - today) / 1000;
    diff = Math.floor(diff);
    let days = Math.floor(diff / (24 * 60 * 60));

    let daysToTrip = '';

    if (days < 0) {
        daysToTrip = Math.abs(days) + ' days ago';
    } else if (days > 0) {
        daysToTrip = Math.abs(days) + ' days away';
    } else {
        daysToTrip = 'today';
    }

    // Calculate trip duration
    const tripDifference = Math.abs(tripFinalDate - target);
    const tripDifferenceDays = Math.ceil(tripDifference / (1000 * 60 * 60 * 24));

    console.log("Trip difference in server console is: " + tripDifferenceDays);

    let apiKey = `${process.env.DARK_SKY_API_KEY}`
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let theAppURL = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude;
    console.log("Calling: " + theAppURL);

    const darksky = new DarkSky(apiKey)
    try {
        const forecast = await darksky
            .options({
                latitude,
                longitude,
                time: theTime
            })
            .get()

        summary = forecast.currently.summary;
        high = forecast.daily.data[0].temperatureHigh;
        low = forecast.daily.data[0].temperatureLow;
        console.log("Summary is: " + summary);
    } catch (error) {
        console.log("error", error);
    }

    try {
        var params = {
            key: `${process.env.PIXABAY_API_KEY}`,
            q: location,
            image_type: "photo",
        };

        console.log("Calling Pixabay API");

        PixabayPhotos.query(params, function (errors, response, req) {
            if (errors) {
                console.log('One or more errors were encountered:');
                console.log('- ' + errors.join('\n- '));
                return;
            }

            console.log('Photos API response:');

            let imgURL = response.hits[0].largeImageURL;
            travelPlanner["image"] = imgURL;
            newEntry = {
                theSummary: summary,
                theLow: low,
                theHigh: high,
                theImage: imgURL,
                tripDays: daysToTrip,
                mainTripDifference: tripDifferenceDays
            }

            projectData.push(newEntry);

            console.log("Travel planner is: " + projectData);

            res.send(projectData);
        });
    } catch (error) {
        console.log("error", error);
    }
})

module.exports = app;
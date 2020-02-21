const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const fetch = require('node-fetch')
const bodyparser = require('body-parser')
const cors = require('cors')
const PORT = 5000

// Destination coordinates
let destCoords = {}

// Get the api keys
const DARK_SKY_API = process.env.API_KEY_DARKSKY
const GEONAMES_API = process.env.API_KEY_GEONAMES
const PIXABAY_API = process.env.API_KEY_PIXABAY

// Configure app to handle json and form data
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// Configure app to enable cors
app.use(cors())

app.use(express.static('dist'))

// Root route
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

// Trip details route
app.post('/postTrip', (req, res) => {
    fetch(`http://api.geonames.org/searchJSON?name=${req.body.tripDest}&username=${GEONAMES_API}`)
        .then(data => data.json())
        .then(data => {
            destCoords.latitude = data.geonames[0].lat
            destCoords.longitude = data.geonames[0].lng
            return fetch(`https://api.darksky.net/forecast/${DARK_SKY_API}/${destCoords.latitude},${destCoords.longitude}`)
        })
        .then(data => data.json())
        .catch(err => `Error >>> ${err}`)
        .then(data => res.send(data))
        .catch(err => `Error in sending data to client >>> ${err}`)

})

// Listen to server on port
app.listen(PORT, () => console.log(`App listening on port : ${PORT}`))
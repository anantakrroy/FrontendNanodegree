// Setup environment variables
const dotenv = require('dotenv')
dotenv.config()

// Storage variable
aylienData = {}

// Require packages
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var AYLIENTextAPI = require('aylien_textapi')
const mockAPIResponse = require('./mockAPI.js')


// Set Aylien credentials
var textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

// Use cors
app.use(cors())

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'dist' })
})

app.post('/classify', handleAPIData)

function handleAPIData(req, res) {
    textapi.classify({
        'url': req.body.text
    }, (err, response) => {
        if (err) {
            res.send(err)
        }
        res.send(response)
    })
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// mock api get
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


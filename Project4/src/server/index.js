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

// Set Aylien credentials
var textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})


// Instantiate express app
const app = express()

// Use cors
app.use(cors())

app.use(express.static('dist'))

console.log(__dirname)

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../../src/client/views' })
})

// Classify Article route
app.post('/classifyArticle', function (req, res) {
    console.log('REQUEST BODY URL >>>>>>>> ', req.body.url)
    textapi.classify({
        url: req.body.url
    }, function (error, response) {
        if (error) {
            console.log('ERROR >>>>>> ', error)
            res.send(error)
        } else {
            console.log('RESPONSE >>>>>> ', response)
            res.send(response)
        }
    });
})

// Sentiment Analysis route
app.post('/sentimentOfArticle', function (req, res) {
    console.log('REQUEST BODY URL >>>>>>>> ', req.body.url)
    textapi.sentiment({
        url: req.body.url,
        mode: 'document'
    }, function (error, response) {
        if (error) {
            console.log('ERROR >>>>>> ', error)
            res.send(error)
        } else {
            console.log('RESPONSE >>>>>> ', response)
            res.send(response)
        }
    });
})

// Article summary route
app.post('/summariseArticle', function (req, res) {
    console.log('REQUEST BODY URL >>>>>>>> ', req.body.url)
    textapi.summarize({
        url: req.body.url,
        sentences_number: 3
    }, function (error, response) {
        if (error) {
            console.log('ERROR >>>>>> ', error)
            res.send(error)
        } else {
            console.log('RESPONSE >>>>>> ', response)
            res.send(response)
        }
    });
})

// Article hashtags route
app.post('/hashtagArticle', function (req, res) {
    console.log('REQUEST BODY URL >>>>>>>> ', req.body.url)
    textapi.hashtags({
        url: req.body.url,
    }, function (error, response) {
        if (error) {
            console.log('ERROR >>>>>> ', error)
            res.send(error)
        } else {
            console.log('RESPONSE >>>>>> ', response)
            res.send(response)
        }
    });
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

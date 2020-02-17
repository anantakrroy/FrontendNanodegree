const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const PORT = 5000

// Configure app to handle json and form data
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// Configure app to enable cors
app.use(cors())

app.use(express.static('dist'))

// Root route
app.get('/',(req, res) => {
    res.sendFile('dist/index.html')
})

// Listen to server on port
app.listen(PORT, () => console.log(`App listening on port : ${PORT}`))
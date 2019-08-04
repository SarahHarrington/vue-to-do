const express = require('express')
const path = require('path')
const app = express()
const config = require('./app/Config')
const port = config.APP_PORT || 4000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(config.DB, {useNewUrlParser: true})

app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const corsConfig = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
 res.header('Access-Control-Allow-Credentials', true)
 res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
 next()
}

app.use(corsConfig)

const todoRoutes = require('./app/Routes')

app.use('/api', todoRoutes)

app.get('/', function (req, res, next) {
 res.sendFile('./public/index.html')
})


app.listen(port, () => {
 console.log(`Listening on port ${port}`)
})
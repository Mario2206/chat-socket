const express = require('express')
const mongoose = require('mongoose')
const expressParser  = require('express-form-data')
const bodyParser = require('body-parser')


const CONNECT_LINK = require('./config').CONNECT_LINK


const userRoute = require("./routes/userRoute")
const app = express()


mongoose.connect(CONNECT_LINK, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connection to mongoDB is ok"))
.catch(error => console.log(error));

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})

app.use(express.static('node_modules/socket.io-client/dist'))
app.use("/images",express.static('images'))

app.use(bodyParser.json())
app.use("/user", userRoute)


module.exports = app;
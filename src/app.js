require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

//console.log(express().listen());

const app = express()

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init db
// lv0
//const mongoose = require('mongoose')
//console.log(mongoose.connection.readyState);
////require('./dbs/init.mongodb.lv0')
//console.log(mongoose.connection.readyState);

// init db
require('./dbs/init.mongodb')
const { checkOverload } = require('./helpers/check.connect')
//checkOverload()

// init routers
app.use('/', require('./routes'))

// handling error


module.exports = app
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const {info, error} = require('./utils/logger')
const app = express()


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then( response => info("MongoDB connected"))
  .catch( err => error(err))

app.use(express.json())


app.use('/api/blogs', blogsRouter)

module.exports = app
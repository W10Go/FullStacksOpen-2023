const { MONGODB_URI, PORT } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const { info, logError } = require('./utils/logger')
const mongoose = require('mongoose')

// bloglist expansion
// Step3    Implement a way to create new users by doing an HTTP POST request.✔
//          Implement a way to see the details of all users by doing a suitable HTTP request.✔
// Step4    Add a feature wich adds the following restriction to creatin a new users: username and password mus be given.✔
//              °Username and password must be at least 3 characters long.✔
//              °The username must be unique.✔
// Step5    Expand blogs so that each blog contains information on the creator of the blog with population method.✔
// Step6    Implement token-based authentication.✔
// Step7    Modify adding new blogs so the user identified by the token is designated as the creator of the blog.✔
// Step8    Use a middleware to extract the token from the authorization header.✔
// Step9    Change the delete blog operation to make that a blog can be deleted only by the user who added the blog.✔
// Step10   Create a middleware to extract the user and use it on both post and delete functions.✔
// Step11   Fix the tests and write a new test to ensure adding a blog fails with proper status code 401.✔

mongoose.set('strictQuery', false)

info('connecting to MongoDB')
mongoose.connect(MONGODB_URI)
    .then(() => {
        info('connected to MongoDB')
    })
    .catch((error) => {
        logError('error connecting to MongoDB:', error.message)
    })

app.use(cors())
// app.use(express.static('dist))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


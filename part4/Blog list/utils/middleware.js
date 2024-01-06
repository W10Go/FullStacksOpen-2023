const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { info, logError } = require('./logger')

const requestLogger = (request, response, next) =>{
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}

const tokenExtractor = (request, response, next) =>{
    const authorization = request.get('authorization')
    if(authorization){
        if(!(authorization.startsWith('Bearer '))){
            response.status(401).json({ error: 'Invalid Authorization header' })
        }else{
            const token = authorization.replace('Bearer ', '')
            request.token = token
            console.log(token);
        }
    }
    else{
        response.status(401).json({ error: 'there is not Authorization header' })
    }
    next()
}

const userExtractor = async (request, response, next) =>{
    if(request.token){
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!decodedToken.id){
            
            response.status(401).json({ error: 'token invalid' })
          }
        const decodedUser = await User.findById(decodedToken.id)
        request.user = decodedUser
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = ( error, request, response, next ) => {
    logError(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: error.message })
    } else if(error.name === 'TokenExpiredError'){
        return response.status(401).json({ error: 'token expired' })
    }
    
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
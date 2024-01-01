require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(cors())
// Step1    Returns a hardcoded list from http://localhost:3001/api/persons ✔
// Step2    Implement a page that displays the number of people at the address http://localhost:3001/info✔
// Setp3    Add a funcionality to display the info for a single phonebook entry ✔
// Step4    Add a HTTP DELETE request ✔
// Step5    Add a HTTP POST request to http://localhost:3001/api/persons ✔
//          Use Math.Random to choose an Id for new person.
// Step6    Handle new entrys:
//            °The name or number is missing ✔
//            °The name already existis in the phonebook✔
// Step7    Add the morgan middleware to your aplication for logging ✔
//          Configure it to log messages to your console based on the tiny configuration.✔
// Step8    Configure morgan so that it also shows the data sent in HTTP POST request✔
// Phonebook database
// Step1    Change the fetching of all phonebook entries so that the data is fetched from the database ✔
// Step2    Change the backend so that new numbers are saved to the database✔
// Step3    Change the backend so that deleting phonebook entries is reflected in the database✔
// Step4    Move the error handling of the aplication to a new error handler middleware.✔
// Step5    If the user tries to create a new phonebook entry for a person whose name is already, update the phone number by making an HTTP PUT request✔
// Step6    Update the handling of the api/persons/:id to use the database. Must work with the browser, postman or VSCodeRest Client.✔
// Step7    Expand the validation so that the name stored in the database has to be at least three characters long. Make that the front end displays that✔
// Step8    Add validations to application, For numbers:
//            °Have length of 8 or more✔
//            °be formed of two parts that are separated by "-", the first part has two or three numbers and the second part also consists of numbers✔
// Step9    Deploy the database backend to production✔


morgan.token('data', (req, res) => {
  const body = JSON.stringify(req.body)
  return body
})

app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)


let persons = [
  { 
    'id': 1,
    'name': 'Arto Hellas', 
    'number': '040-123456'
  },
  { 
    'id': 2,
    'name': 'Ada Lovelace', 
    'number': '39-44-5323523'
  },
  { 
    'id': 3,
    'name': 'Dan Abramov', 
    'number': '12-43-234345'
  },
  { 
    'id': 4,
    'name': 'Mary Poppendieck', 
    'number': '39-23-6423122'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>The Phonebook backend</h1>')
})

app.get('/info', (request, response) => {
    
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people <br/>${date}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  //
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :data'), (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {bname, bnumber} = request.body

  Person.findByIdAndUpdate(request.params.id, {bname, bnumber}, { new: true, runValidators: true, bname: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//const generateId = () => {
//    return Math.floor(Math.random()*10000)
//}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
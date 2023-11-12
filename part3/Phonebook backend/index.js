const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()

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
// 

app.use(express.json())



morgan.token('data', (req, res) => {
  const body = JSON.stringify(req.body)
  return body
})

app.use(morgan('tiny'))
app.use(express.static('dist'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>The Phonebook backend</h1>')
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`
    <p>Phonebook has info for ${persons.length} people <br/>${date}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

const generateId = () => {
    return Math.floor(Math.random()*10000)
}

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :data'), (request, response) =>{
    const body = request.body
    if(!body.name){
      return response.status(400).json({
        error: 'Name missing'
      })
    }
    if(!body.number){
      return response.status(400).json({
        error: 'Number missing'
      })
    }
    const repeated = persons.find(person => person.name === body.name)
    if(repeated){
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
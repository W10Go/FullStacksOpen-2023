import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'

// Step1  Add names to the phonebook ✔
// Step2  Show an alert when the name already exists ✔
// Step3  Allow users to add phone numbers ✔
// Step4  Implement a search field ✔
// Step5  Refactors✔
// Step6  Place the db.json on root ✔
//        Start json-server on port 3001 ✔
//        Make sure that the server returns the list of people ✔
// Step7  Save the new persons to a backend server✔
// Step8  Extract the code into its own module (person.js) ✔
// Step9  Put a delete button on each person✔
//        Shows an confirm window when want to delete✔
// Step10 Shows an confirm window when a new name is repeated and add a option to replace an old number ✔
// Step11 Display a message when add a new person ✔
//        Styles! ✔
// Step12 Handle the error when a person is updated when is already deleted ✔
// Step13 

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newPersonsToShow, setNewPersonsToShow] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(false)

  // Fetching
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNewPersonsToShow(initialPersons)
      })
  },[])

  // Handleres
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setNewPersonsToShow(persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())))// Filter the search every time you update the text field
  }
  
  // Button Logic
  const addName = (event) => { // Add Button is pressed
    event.preventDefault()
    const nameObject = { // Creates a new Object
      name: newName,
      number: newNumber
    }
    if ( nameObject.name == ''){ // Alert if the name field is empty
      alert(`There is no text on the field`)
    }
    else if(nameObject.number == ''){ // Alert if the number field is empty
      alert('The number field is empty')
    }
    else
    {
    let isRepeated = false
    let idRepeated
    persons.forEach(person => { // turns the variable "isRepeated" if any of the persons has the name of the newone
      if(person.name === nameObject.name){
        isRepeated = true
        idRepeated = person.id
      }
    })
    if(isRepeated){
      if(window.confirm(`${nameObject.name} is already on the list, replace the old number with a new one?`)){
          personService
            .updateAt(idRepeated, nameObject)
            .then(()=>true)
            .catch(error => {
              setMessageType(true)
              setMessage(`Information of ${nameObject.name} has already been removed fron server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
          nameObject.id = idRepeated
          const auxRepeted = persons.map(person => person.id == idRepeated ? nameObject : person)
          setPersons(auxRepeted)
          setNewPersonsToShow(auxRepeted)
          setNewFilter('')
          setNewName('')
          setNewNumber('')
      }
    }
    else { // If can add a new person then turns the fields with empty spaces
      
      personService
        .create(nameObject)
        .then(returnedPerson => {
          const aux = persons.concat(returnedPerson)
          setPersons(aux)
          setNewPersonsToShow(aux)
          setNewFilter('')
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${nameObject.name}`)
          setMessageType(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }} 
  }

  const deletePerson = (person) =>{
    const id = person.id
    if(window.confirm(`Delete: ${person.name}`))
    {personService
      .deleateAt(id)
      .then(() => {
        const aux = persons.filter(person => person.id != id)
        setNewPersonsToShow(aux)
        setPersons(aux)
        setNewFilter('')
        setNewName('')
        setNewNumber('')
      })}

  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} tag={messageType}/>
      <h2>filter</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {newPersonsToShow.map(person => <Persons key={person.id} person={person} deletePerson={deletePerson}/>)}
      </div>
    </div>
  )
}

export default App

// Dan Abramov 12-43-234345
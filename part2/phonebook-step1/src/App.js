import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const alreadyExist = persons.some(person => person.name === newName)


  const addPerson = (event) =>{
    event.preventDefault()
    if(alreadyExist){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const newPerson ={
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')

    }
    
  }

  const changeHandler = (event)=>{
    setNewName(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={changeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index )=> <p key={index}>{person.name}</p>)}
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App
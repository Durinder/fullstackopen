import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    const addName = (event) => {
	    event.preventDefault()
	    const nameObject = {
		    name: newName,
	    }
		if (persons.find(obj => obj.name === nameObject.name)) {
			window.alert(`${newName} is already added to phonebook`)
		}
		else {
			setPersons(persons.concat(nameObject))
			setNewName('')
		}
    }

    const handleFormChange = (event) => {
	    setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                name: <input value={newName}
		    	onChange={handleFormChange} />
            	<button type="submit">add</button>
            </form>
        	<h2>Numbers</h2>
		    {persons.map(person =>
				<p key={person.name}>
					{person.name}
				</p>
			)}
        </div>
    )

}

export default App
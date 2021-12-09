import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
    const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

    const addContact = (event) => {
	    event.preventDefault()
	    const contactObject = {
		    name: newName,
			number: newNumber
	    }
		if (persons.find(obj => obj.name === contactObject.name)) {
			window.alert(`${newName} is already added to phonebook`)
		}
		else {
			setPersons(persons.concat(contactObject))
			setNewName('')
			setNewNumber('')
		}
    }

    const handleNameChange = (event) => {
	    setNewName(event.target.value)
    }

	const handleNumberChange = (event) => {
	    setNewNumber(event.target.value)
    }

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	const numbersToShow = (
		persons.filter(obj => obj.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
	)

    return (
        <div>
            <h2>Phonebook</h2>
				filter shown with <input value={newFilter}
				onChange={handleFilterChange} />
			<h2>add a new</h2>
            <form onSubmit={addContact}>
				<div>
					name: <input value={newName}
					onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber}
					onChange={handleNumberChange} />
				</div>
            	<button type="submit">add</button>
            </form>
        	<h2>Numbers</h2>
		    {numbersToShow.map(person =>
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			)}
        </div>
    )

}

export default App
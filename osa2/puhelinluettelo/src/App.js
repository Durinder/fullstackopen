import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personDB from './services/personDB'
import React, { useEffect, useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		personDB
			.getAll()
				.then(initialPersons => {
					console.log('promise fulfilled')
					setPersons(initialPersons)
				})
	}, [])

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
			personDB
				.create(contactObject)
				.then(returnedObject => {
					setPersons(persons.concat(returnedObject))
					setNewName('')
					setNewNumber('')
					console.log(returnedObject)
				})
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

	const handleDelete = person => {
		if (window.confirm(`Delete ${person.name} ?`)) {
			personDB
				.deleteContact(person.id)
					.then(() => {
						setPersons(persons.filter(n => n.id !== persons.id))
					})
					.catch(error => {
						alert(`the person '${person.name}' was already deleted from server`)
					})
		}
	}

    return (
        <div>
            <h2>Phonebook</h2>
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
			<h3>add a new</h3>
			<PersonForm addContact={addContact} name={newName} number={newNumber}
				handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        	<h3>Numbers</h3>
			<Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
        </div>
    )

}

export default App
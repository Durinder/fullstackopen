import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personDB from './services/personDB'
import React, { useEffect, useState } from 'react'
import { Notification, Error } from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [notification, setNotification] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personDB
			.getAll()
			.then(initialPersons => {
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
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const person = persons.find(obj => obj.name === contactObject.name)
				personDB
					.update(person.id, contactObject)
					.then(() => {
						personDB
							.getAll()
							.then(updatedPersons => {
								setPersons(updatedPersons)
							})
						setNewName('')
						setNewNumber('')
						setNotification(`Updated ${person.name}`)
						setTimeout(() => setNotification(null), 5000)
					})
					.catch(error => {
						setErrorMessage(`Information of ${person.name} has already been removed from server`)
						setTimeout(() => setErrorMessage(null), 5000)
						personDB
							.getAll()
							.then(updatedPersons => (setPersons(updatedPersons)))
						})
				}
			}
		else {
			personDB
				.create(contactObject)
				.then(returnedObject => {
					setPersons(persons.concat(returnedObject))
					setNewName('')
					setNewNumber('')
					setNotification(`Added ${returnedObject.name}`)
					setTimeout(() => setNotification(null), 5000)
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
					setPersons(persons.filter(n => n.id !== person.id))
					setNotification(`Deleted ${person.name}`)
					setTimeout(() => setNotification(null), 5000)
				})
				.catch(error => {
					setErrorMessage(`the person '${person.name}' was already deleted from server`)
					setTimeout(() => setErrorMessage(null), 5000)
					personDB
					.getAll()
					.then(updatedPersons => (setPersons(updatedPersons)))
				})
		}
	}

    return (
        <div>
            <h2>Phonebook</h2>
			<Error message={errorMessage} />
			<Notification message={notification} />
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
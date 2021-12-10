import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Persons = ({ persons, newFilter }) => {
	const ret = persons.filter(obj => obj.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
	return (ret.map(person =>
			<p key={person.name}>
				{person.name} {person.number}
			</p>
		)
	)
}

const PersonForm = ({ addContact, name, number, handleNameChange, handleNumberChange }) => {
	return (
	<form onSubmit={addContact}>
		<div>
			name: <input value={name}
			onChange={handleNameChange} />
		</div>
		<div>
			number: <input value={number}
			onChange={handleNumberChange} />
		</div>
		<button type="submit">add</button>
		</form>
	)
}
const Filter = ({ newFilter, handleFilterChange }) => {
	return (
		<div>
			filter shown with <input value={newFilter}
			onChange={handleFilterChange} />
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])
	console.log('render', persons.length, 'persons')

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

    return (
        <div>
            <h2>Phonebook</h2>
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
			<h3>add a new</h3>
			<PersonForm addContact={addContact} name={newName} number={newNumber}
				handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        	<h3>Numbers</h3>
			<Persons persons={persons} newFilter={newFilter} />
        </div>
    )

}

export default App
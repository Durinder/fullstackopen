const Persons = ({ persons, newFilter, handleDelete }) => {
	const filtered = persons.filter(obj => obj.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)

	return (filtered.map(person =>
			<p key={person.id}>
				{person.name} {person.number}
				<button onClick={() => handleDelete(person)}>delete</button>
			</p>
		)
	)
}

export default Persons;
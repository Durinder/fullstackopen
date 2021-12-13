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

export default PersonForm;
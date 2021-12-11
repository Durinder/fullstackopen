import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Country from './components/Country'

const Search = ({ countries, filter, setFilter }) => {
	const ret = countries.filter(country =>
		country.name.common.toLowerCase().search(filter.toLowerCase()) !== -1)
	console.log(ret)

	if (ret.length > 10) {
		return (
			<div>Too many matches, specify another filter</div>
		)}
	if (ret.length > 1) {
		return (
			ret.map(element =>
					<div key={element.name.common}>
						{element.name.common}
						<button onClick={() => setFilter(element.name.common)}>show</button>
					</div>
			)
		)}
	if (ret.length === 1) {
		return (
			<Country country={ret[0]} />
		)}
	else {
		return (
		<div>No matches, specify another filter</div>
		)}
}

const Filter = ({ filter, handleFilterChange }) => {
	return (
	<div>
		find countries <input value={filter}
		onChange={handleFilterChange}/>
	</div>
	)
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

  return (
    <div>
		<Filter filter={filter} handleFilterChange={handleFilterChange} />
		<Search countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App;

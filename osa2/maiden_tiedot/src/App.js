import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Search = ({ countries, filter }) => {
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
				<p key={element.name.common}>
					{element.name.common}
				</p>
			)
		)}
	if (ret.length === 1) {
		return (
			<div>
			<h2>{ret[0].name.common}</h2>
				capital {ret[0].capital} <br />
				population {ret[0].population}
			<h3>languages</h3>
			<ul>{Object.values(ret[0].languages).map(language =>
				<li key={language}>
					{language}
				</li>)}
			</ul>
			<img src={ret[0].flags.png} alt="flag"></img>
			</div>
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
		<Search countries={countries} filter={filter} />
    </div>
  )
}

export default App;

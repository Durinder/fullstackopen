import axios from "axios";
import React, { useState } from 'react'
import { useEffect } from "react/cjs/react.development";

const Weather = ({ capital }) => {
	const [ apiResponse, setApiResponse ] = useState()

	useEffect (() => {
		const params = {
			access_key: process.env.REACT_APP_API_KEY,
			query: {capital}
		}
		axios
			.get('http://api.weatherstack.com/current', {params})
			.then(response => {
				setApiResponse(response.data)
			})
		}, [capital])

	if (apiResponse === undefined) {
		return <p>Loading...</p>
	}
	else {
		console.log(apiResponse)
		return (
			<div>
				<h3>Weather in {apiResponse.location.name}</h3>
				<b>temperature:</b> {apiResponse.current.temperature} Celcius
				<br />
				<img src={apiResponse.current.weather_icons} alt="weather_icons"></img>
				<br />
				<b>wind:</b> {apiResponse.current.wind_speed} mph direction {apiResponse.current.wind_dir}
			</div>
		)
	}
}

const Country = ({ country }) => {
	return (
		<div>
		<h2>{country.name.common}</h2>
			capital {country.capital} <br />
			population {country.population}
		<h3>languages</h3>
		<ul>{Object.values(country.languages).map(language =>
			<li key={language}>
				{language}
			</li>)}
		</ul>
		<img src={country.flags.png} alt="flag"></img>
		<Weather capital={country.capital[0]} />
		</div>
	)}

export default Country;
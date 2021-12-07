import React, { useState } from 'react'

const StatisticLine = ({ text, value }) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	)
}

const Statistics = ({ good, neutral, bad }) => {
	if (good !== 0 || neutral !== 0 || bad !== 0)
		return (
			<div>
				<h2>statistics</h2>
				<table>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={good + neutral + bad} />
					<StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
					<StatisticLine text="positive" value ={good / (good + neutral + bad) * 100 + ' %'} />
				</table>
			</div>
		)
	else
		return (
			<div>
				<h2>statistics</h2>
				No feedback given
			</div>
		)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
	  setGood(newValue)
  }

  const setToNeutral = newValue => {
	  setNeutral(newValue)
  }

  const setToBad = newValue => {
	  setBad(newValue)
  }

  return (
    <div>
		<h2>give feedback</h2>
		<Button handleClick={() => setToGood(good + 1)} text="good" />
		<Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
		<Button handleClick={() => setToBad(bad + 1)} text="bad" />
		<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
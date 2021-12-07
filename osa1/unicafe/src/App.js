import React, { useState } from 'react'

const Display = props => <div>{props.text} {props.value}</div>

const Statistics = props => {
	if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0)
		return (
			<div>
				<h2>statistics</h2>
				<Display text="good" value={props.good} />
				<Display text="neutral" value={props.neutral} />
				<Display text="bad" value={props.bad} />
				<Display text="all" value={props.good + props.neutral + props.bad} />
				<Display text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
				<Display text="positive" value ={props.good / (props.good + props.neutral + props.bad) * 100 + ' %'} />
			</div>
		)
	else
		return (
			<div><h2>statistics</h2>No feedback given</div>
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
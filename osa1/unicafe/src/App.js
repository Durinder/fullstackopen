import React, { useState } from 'react'

const Display = props => <div>{props.text} {props.value}</div>

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
		<h2>statistics</h2>
		<Display text="good" value={good} />
		<Display text="neutral" value={neutral} />
		<Display text="bad" value={bad} />
		<Display text="all" value={good + neutral + bad} />
		<Display text="average" value={(good - bad) / (good + neutral + bad)} />
		<Display text="positive" value ={good / (good + neutral + bad) * 100 + ' %'} />
    </div>
  )
}

export default App
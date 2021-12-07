import React, { useState } from 'react'

const MostVoted = ({ anecdotes, votes }) => {
	const max = Math.max(...votes)
	const index = votes.indexOf(max)
	return(
		<p>
		{anecdotes[index]}
		<br />
		has {max} votes
		</p>
	)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
	]
	 
	const [selected, setSelected] = useState(0)

	const setToSelected = (max) => setSelected(Math.floor(Math.random() * max))

	const [points, setPoints] = useState(new Array(7).fill(0))

	const setToPoints = () => {
	const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}
	
	return (
		<div>
			<h2>Anecdote of the day</h2>
			{anecdotes[selected]}
			<br />
			has {points[selected]} votes
			<br />
			<Button handleClick={() => setToPoints(selected)} text="vote" />
			<Button handleClick={() => setToSelected(7)} text="next anecdote" />
			<h2>Anecdote with most votes</h2>
			<MostVoted anecdotes={anecdotes} votes={points} />
		</div>
	)
}

export default App
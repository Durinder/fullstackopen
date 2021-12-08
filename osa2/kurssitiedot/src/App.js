import React from 'react'

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

const Header = ({ name }) => (
	<h1>
		{name}
	</h1>
	)

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
	)

const Content = ({ parts }) => (
	<div>
		{parts.map(contents => <Part key={contents.id} part={contents} />)}
	</div>
	)

/* const Total = (props) => {
	return (
	<p>
		Number of exercises {props.parts[0].exercises + props.parts[1].exercises +
		props.parts[2].exercises}
	</p>
	)
} */

const App = () => {
	const course = {
	  name: 'Half Stack application development',
	  id: 1,
	  parts: [
		{
		  name: 'Fundamentals of React',
		  exercises: 10,
		  id: 1
		},
		{
		  name: 'Using props to pass data',
		  exercises: 7,
		  id: 2
		},
		{
		  name: 'State of a component',
		  exercises: 14,
		  id: 3
		}
	  ]
	}
  
	return (
	  <div>
		<Course course={course} />
	  </div>
	)
  }

export default App
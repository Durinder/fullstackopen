const Total = ({ parts }) => parts.reduce((sum, part) => sum + part.exercises, 0)

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
	)

const Content = ({ parts }) => (
	<div>
		{parts.map(contents => <Part key={contents.id} part={contents} />)}
		<b>total of <Total parts={parts} /> exercises</b>
	</div>
	)

const Header = ({ name }) => (
	<h2>
		{name}
	</h2>
	)

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

export default Course
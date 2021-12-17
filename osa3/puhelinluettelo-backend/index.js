const { response } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny', {
	skip: (req) => req.method === "POST"
}))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
	skip: (req) => req.method !== "POST"
}))

let persons = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/info', (req, res) => {
	const date = new Date()
	res.send(`<div>Phonebook has info for ${persons.length} people
	<p>${date}</p>
	</div>`)
})
  
app.get('/api/persons', (req, res) => {
	Person.find({}).then(people => {
		res.json(people)
	})
})

app.get('/api/persons/:id', (req, res) => {
	Person
		.find({ _id: req.params.id })
		.then(person => {
			res.json(person)
		})
		.catch(error => {
			res.status(404).end()
		})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'name or number missing'
		})
	}

	if (Object.values(persons).find(elem => elem.name === body.name)) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = new Person ({
		name: body.name,
		number: body.number
	})
//		id: Math.floor(Math.random() * 65536)

	person.save().then(savedPerson => {
		res.json(savedPerson)
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
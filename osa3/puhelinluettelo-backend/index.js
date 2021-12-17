const { response } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny', {
	skip: (req) => req.method === "POST"
}))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
	skip: (req) => req.method !== "POST"
}))

app.get('/info', (req, res, next) => {
	const date = new Date()
	Person.find({})
		.then(people => {
			res.send(`<div>Phonebook has info for ${people.length} people
			<p>${date}</p>
			</div>`)
		})
		.catch(error => next(error))
})
  
app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(people => {
			res.json(people)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person
		.findById(req.params.id)
		.then(person => {
			if (person) {
			res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'name or number missing'
		})
	}

	const person = new Person ({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  return response.status(400).send({ error: 'malformatted id' })
	}
  
	next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
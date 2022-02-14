const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
	const users = await User.find({})
	response.json(users.map(u => u.toJSON()))
})

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body

	const existingUser = await User.findOne({ username })
	if (existingUser) {
		return response.status(400).json({
			error: "username must be unique"
		})
	}

	const body = request.body

	if (body.password === undefined) {
		return response.status(400).send({ error: "missing password" })
	}

	if (body.password.length < 3) {
		return response.status(400).send({ error: "password needs to be at least 3 characters" })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter
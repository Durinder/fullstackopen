const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body
	if (body.title === undefined || body.url === undefined ||
		body.userId === undefined) {
		return response.status(400).send({ error: "missing fields" })
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
	response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog === null) {
		return response.status(404).end()
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (blog.user.toString() !== decodedToken.id) {
		return response.status(403).send({ error: "blog deletion unauthorized by different user" })
	}

	await blog.deleteOne()
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter
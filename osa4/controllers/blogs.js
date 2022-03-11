const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body
	if (!body.title || !body.url) {
		return response.status(400).send({ error: "missing fields" })
	}

	if (!request.user) {
		return response.status(401).send({ error: "no token" })
	}
	const user = request.user

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

	if (!request.user) {
		return response.status(401).send({ error: "no token" })
	}
	if (blog.user.toString() !== request.user._id.toString()) {
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
		likes: request.body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter
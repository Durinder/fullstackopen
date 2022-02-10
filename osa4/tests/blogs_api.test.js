const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("right amount of blogs are returned", async () => {
	const response = await api.get("/api/blogs")

	expect(response.body).toHaveLength(initialBlogs.length)
})

test("returned blogs have a field named 'id'", async () => {
	const response = await api.get("/api/blogs")

	expect(response.body[0].id).toBeDefined()
})

test("HTTP POST to /api/blogs works", async () => {
	await api
		.post("/api/blogs")
		.send({
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		})
		.expect(200)
		.expect("Content-Type", /application\/json/)

	const newList = await api.get("/api/blogs")
	
	expect(newList.body).toHaveLength(3)
	expect(newList.body[2].id).toBe("5a422b3a1b54a676234d17f9")
})

afterAll(() => {
	mongoose.connection.close()
})
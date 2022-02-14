const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
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

describe("HTTP GET to /api/blogs", () => {
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
})

describe("HTTP POST to /api/blogs", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("sekret", 10)
		const user = new User({ username: "root", passwordHash })

		await user.save()
	})

	test("new blog is added", async () => {
		const user = await User.findOne({})
		await api
			.post("/api/blogs")
			.send({
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				userId: user._id
			})
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const newList = await Blog.find({})
		
		expect(newList).toHaveLength(3)
		expect(newList[2].title).toEqual("Canonical string reduction")
	})

	test("if no 'likes' field, it is given a value of 0", async () => {
		const user = await User.findOne({})
		const response = await api
			.post("/api/blogs")
			.send({
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				userId: user._id
			})
	
		expect(response.body.likes).toBe(0)
	})

	test("400 Bad Request for no title field", async () => {
		await api
			.post("/api/blogs")
			.send({
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12
			})
			.expect(400)
	})

	test("400 Bad Request for no url field", async () => {
		await api
			.post("/api/blogs")
			.send({
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				likes: 12
			})
			.expect(400)
	})
})

describe("HTTP DELETE to /api/blogs/{id}", () => {
	test("returns 204 and removes the blog", async () => {
		await api
			.delete("/api/blogs/5a422a851b54a676234d17f7")
			.expect(204)
		
		const list = await Blog.find({})

		expect(list).toHaveLength(1)
		expect(list[0].title).toEqual(initialBlogs[1].title)
	})
})

describe("HTTP PUT to /api/blogs/{id}", () => {
	test("update amount of likes", async () => {
		const response = await api
			.put("/api/blogs/5a422a851b54a676234d17f7")
			.send({
				likes: 1337
			})

		expect(response.body.likes).toEqual(1337)
	})

	test("update title", async () => {
		const response = await api
			.put("/api/blogs/5a422a851b54a676234d17f7")
			.send({
				title: "The Testing"
			})

		expect(response.body.title).toEqual("The Testing")
	})
})

afterAll(() => {
	mongoose.connection.close()
})
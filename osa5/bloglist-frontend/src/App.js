import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewForm from './components/CreateNewForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs ))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => (
		<LoginForm
			handleLogin={handleLogin}
			username={username}
			setUsername={setUsername}
			password={password}
			setPassword={setPassword}
		/>
	)

	return (
		<div>
			{user === null ?
				<div>
					{errorMessage}
					{loginForm()}
				</div> :
				<div>
					<h2>blogs</h2>
					<p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
					<CreateNewForm />
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App
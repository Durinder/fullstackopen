import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Notification, Error } from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const BlogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    fetchBlogs()
      .catch(console.error)
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
      setNotification(`Welcome ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification('Successfully logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    BlogFormRef.current.toggleVisibility()

    try {
      const addedBlog = await blogService.create(newBlog)
      const newList = [...blogs, addedBlog]
      setBlogs(newList.sort((a,b) => b.likes - a.likes))
      setNotification(`added ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('missing title or author or url')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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
      <Error message={errorMessage} />
      <Notification message={notification} />
      {user === null ?
        <div>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={BlogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} setErrorMessage={setErrorMessage}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
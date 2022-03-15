import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs, setNotification, setErrorMessage }) => {
  const [allInfo, setAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 2,
    marginBottom: 2
  }
  const handleClick = () => {
    setAllInfo(!allInfo)
  }

  const addLike = async () => {
    const likes = {
      likes: blog.likes + 1
    }
    try {
      const updatedBlog = await blogService.update(blog.id, likes)
      const updatedBlogs = blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      setNotification(`liked ${blog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const remove = async () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      try {
        const toBeRemoved = blog.id
        const response = await blogService.remove(blog.id)
        if (response.status === 204) {
          setBlogs(blogs.filter((blog) => blog.id !== toBeRemoved))
          setNotification(`removed ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
      }
      catch (exception) {
        setErrorMessage(exception)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  return (
    <div style ={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>{allInfo ? 'hide' : 'view'}</button>
      </div>
      {allInfo === true &&
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={addLike} type="submit">like</button></div>
        <div>{blog.user.name}</div>
        {user.name === blog.user.name &&
        <button onClick={remove}>remove</button>
        }
      </div>
      }
    </div>
  )}

export default Blog
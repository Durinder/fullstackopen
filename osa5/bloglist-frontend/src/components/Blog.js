import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, addLike, blogs, setBlogs, setNotification, setErrorMessage }) => {
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
        setErrorMessage('Cannot remove blogs added by other users')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button id="allInfo" onClick={handleClick}>{allInfo ? 'hide' : 'view'}</button>
      </div>
      {allInfo === true &&
      <div className="allInfo">
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button id="like-button" onClick={() => addLike(blog)} type="submit">like</button></div>
        <div>{blog.user.name}</div>
        {user.name === blog.user.name &&
        <button id="remove-button" onClick={remove}>remove</button>
        }
      </div>
      }
    </div>
  )}

export default Blog
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotification, setErrorMessage }) => {
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
  const handleClick = (e) => {
    setAllInfo(!allInfo)
  }

  const addLike = async (event) => {
    const likes = {
      likes: blog.likes + 1
    }
    try {
      await blogService.update(blog.id, likes)
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
      </div>
    }
  </div>
)}

export default Blog
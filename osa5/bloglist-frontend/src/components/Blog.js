import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [allInfo, setAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleClick = (e) => {
    // e.preventDefault()
    setAllInfo(!allInfo)
  }

return (
  <div style ={blogStyle} onClick={handleClick}>
    {allInfo === false ?
      <div>{blog.title} {blog.author}
      </div>
      :
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.user.name}</div>
      </div>
    }
  </div>
)}


Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog
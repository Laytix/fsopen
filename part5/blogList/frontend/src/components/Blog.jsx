import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, updateLikes, username, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    updateLikes(blog.id)
  }

  const handledelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className="blog">
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">by {blog.author}</div>
      <button onClick={toggleDetails}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          {username === blog['user'].username && (
            <div>
              <button onClick={handledelete}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

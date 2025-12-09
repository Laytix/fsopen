import './Blog.css'

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">by {blog.author}</div>
    </div>
  )
}

export default Blog
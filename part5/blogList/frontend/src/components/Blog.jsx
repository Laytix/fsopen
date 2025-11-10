const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    marginTop:2
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog
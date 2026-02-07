import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)

  const reset = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes(0)
  }

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createBlog(newBlogTitle, newBlogAuthor, newBlogUrl, newBlogLikes)
          reset()
        }}
      >
        <div>
          <label>
            title
            <input
              type="text"
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            likes
            <input
              type="number"
              value={newBlogLikes}
              onChange={({ target }) => setNewBlogLikes(Number(target.value))}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

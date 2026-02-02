import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisble] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotification(`Welcome ${user.name}! You have successfully logged in`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch {
      setNotification('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser('')
    window.localStorage.removeItem('loggedBlogUser')
    setLoginVisible(false)
  }

  const createBlog = async (blogTitle, blogAuthor, blogUrl, blogLikes) => {
    // event.preventDefault();

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: blogLikes,
      }

      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setBlogVisble(false)

      setNotification(
        `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      )
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch (error) {
      setNotification(
        `Error creating blog: ${error.response?.data?.error || 'Unknown error'}`
      )
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const updateLikes = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id)
      if (!blogToUpdate) return

      const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      }

      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))

      setNotification(`You liked "${returnedBlog.title}"`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch (error) {
      setNotification(
        `Error updating likes: ${
          error.response?.data?.error || 'Unknown error'
        }`
      )
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const deleteblog = async (id) => {
    try {
      const blogToDelete = blogs.find((blog) => blog.id === id)
      if (!blogToDelete) return

      await blogService.deleteblog(blogToDelete.id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

      setNotification(
        `Blog "${blogToDelete.title}" by ${blogToDelete.author} deleted`
      )
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch (error) {
      setNotification(
        `Error deleting blog: ${
          error.response?.data?.error || 'Unknown error'
        }`
      )
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </div>
      </div>
    )
  }

  const newBlogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisble(true)}>Create Blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={createBlog} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} type={notificationType} />

      {!user && loginForm()}
      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>{newBlogForm()}</div>
        </div>
      )}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            username={user.username}
            deleteBlog={deleteblog}
          />
        ))}
    </div>
  )
}

export default App

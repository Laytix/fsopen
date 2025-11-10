import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogLikes, setNewBlogLikes] = useState(0);

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");

      setNotification(`Welcome ${user.name}! You have successfully logged in`);
      setNotificationType('success');
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    } catch {
      setNotification('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser('')
    window.localStorage.removeItem('loggedBlogUser')
  }

  const createBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: newBlogLikes,
      };

      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setNewBlogLikes(0);

      setNotification(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`);
      setNotificationType('success');
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    } catch (error) {
      setNotification(`Error creating blog: ${error.response?.data?.error || 'Unknown error'}`);
      setNotificationType('error');
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const newBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} type={notificationType} />

      {!user && loginForm()}
      {user && (
        <div>
                  <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>Logout</button>
        </div>
        <div>
          {newBlogForm()}
        </div>
        </div>

      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

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

  const [loginVisible, setLoginVisible] = useState(false);
  const [blogVisible, setBlogVisble] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      setNotification(`Welcome ${user.name}! You have successfully logged in`);
      setNotificationType("success");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    } catch {
      setNotification("Wrong username or password");
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser("");
    window.localStorage.removeItem("loggedBlogUser");
    setLoginVisible(false)
  };

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
      setBlogVisble(false)

      setNotification(
        `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      );
      setNotificationType("success");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    } catch (error) {
      setNotification(
        `Error creating blog: ${error.response?.data?.error || "Unknown error"}`
      );
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ?  "" : "none"};

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
    );
  };

  const newBlogForm = () => {
    const hideWhenVisible =  {display: blogVisible ? "none" : "" }
    const showWhenVisible = { display: blogVisible ? "" : "none"} 

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisble(true)}>Create Blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createBlog={createBlog}
            newBlogTitle={newBlogTitle}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value) }
            newBlogAuthor={newBlogAuthor}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            newBlogLikes={newBlogLikes}
            handleLikesChange={({ target }) => setNewBlogLikes(Number(target.value))}
            newBlogUrl={newBlogUrl}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
          />
          
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

import { useState } from "react";



const BlogForm = ({
  createBlog,
  newBlogTitle,
  handleTitleChange,
  newBlogAuthor,
  handleAuthorChange,
  newBlogLikes,
  handleLikesChange,
  newBlogUrl,
  handleUrlChange,
}) => {

    
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={newBlogTitle}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={newBlogAuthor}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newBlogUrl}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <div>
          <label>
            likes
            <input
              type="number"
              value={newBlogLikes}
              onChange={handleLikesChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { request } = require("../app");
const { error } = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: "token missing" });
    }

    const token = jwt.verify(request.token, process.env.SECRET);
    if (!token.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(token.id);

    if (!user) {
      return response.status(400).json({ error: "UserId not found." });
    }

    console.log(`User: ${user.name}`);

    if (!request.body.url || !request.body.title) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    const blog = new Blog({ ...request.body, user: user._id });
    const newBlog = await blog.save();

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    response.status(201).json(newBlog);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
    response.status(500).json({ error: `encountered error: ${error}` });
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!token.id) {
    return response.status(401).send({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id)

  console.log("token id", token.id)
  console.log("blog user id", blog.user.toString())

  if(token.id === blog.user.toString()){
    await blog.deleteOne()
    response.status(204).end();
  }else{
    return response.status(401).send({error: "only the blog creator allowed to delete this blog."})
  }

});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;

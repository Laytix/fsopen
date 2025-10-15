const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    const user = await User.findById(request.body.userId);

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
    response.status(500).json({ error: `encountered error: ${error}` });
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
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

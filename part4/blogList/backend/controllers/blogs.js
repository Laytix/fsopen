const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  if(!request.body.url || !request.body.title){
    return response.status(400).json({
      error: "content missing",
    });
  }

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  
})
module.exports = blogsRouter
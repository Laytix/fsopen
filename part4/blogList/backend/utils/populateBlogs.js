const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('./config')

const populateBlogsWithUsers = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Find all blogs without a user
    const blogsWithoutUser = await Blog.find({ user: { $exists: false } })
    console.log(`Found ${blogsWithoutUser.length} blogs without users`)

    if (blogsWithoutUser.length === 0) {
      console.log('No blogs to update!')
      await mongoose.connection.close()
      return
    }

    // Get all users
    const users = await User.find({})
    console.log(`Found ${users.length} users`)

    if (users.length === 0) {
      console.log('No users found! Please create users first.')
      await mongoose.connection.close()
      return
    }

    // Update each blog with a random user
    for (const blog of blogsWithoutUser) {
      // Pick a random user
      const randomUser = users[Math.floor(Math.random() * users.length)]

      // Update the blog with the user
      blog.user = randomUser._id
      await blog.save()

      // Add the blog to the user's blogs array if not already present
      if (!randomUser.blogs.includes(blog._id)) {
        randomUser.blogs = randomUser.blogs.concat(blog._id)
        await randomUser.save()
      }

      console.log(`Assigned blog "${blog.title}" to user "${randomUser.username}"`)
    }

    console.log('\nSuccessfully populated all blogs with users!')
    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error)
    await mongoose.connection.close()
  }
}

populateBlogsWithUsers()

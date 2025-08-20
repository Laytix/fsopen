const blog = require('../models/blog')

const blogDummyData = [
  {
    title: "Getting Started with React Hooks",
    author: "Sarah Chen",
    url: "https://techblog.example.com/react-hooks-guide",
    likes: 142
  },
  {
    title: "10 JavaScript Tips Every Developer Should Know",
    author: "Mike Rodriguez",
    url: "https://devtips.example.com/js-tips-2024",
    likes: 89
  },
  {
    title: "Building Scalable Node.js Applications",
    author: "Emily Watson",
    url: "https://backend.example.com/scalable-nodejs",
    likes: 234
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    author: "Alex Thompson",
    url: "https://frontendmaster.example.com/grid-vs-flexbox",
    likes: 167
  },
  {
    title: "Introduction to Machine Learning with Python",
    author: "Dr. James Liu",
    url: "https://mlblog.example.com/python-ml-intro",
    likes: 312
  },
  {
    title: "Mastering Git Workflow for Teams",
    author: "Rachel Green",
    url: "https://devops.example.com/git-workflow-teams",
    likes: 78
  },
  {
    title: "REST API Best Practices",
    author: "David Park",
    url: "https://apidesign.example.com/rest-best-practices",
    likes: 195
  },
  {
    title: "Understanding Async/Await in JavaScript",
    author: "Lisa Martinez",
    url: "https://jsmastery.example.com/async-await-explained",
    likes: 156
  },
  {
    title: "Docker Containerization for Beginners",
    author: "Tom Wilson",
    url: "https://containerize.example.com/docker-beginners",
    likes: 203
  },
  {
    title: "Modern Web Performance Optimization",
    author: "Anna Kowalski",
    url: "https://webperf.example.com/optimization-2024",
    likes: 128
  }
];


const blogsInDB = async () => {
    const notes = await blog.find({})
    return notes.map(note => note.toJson())
}


module.exports = {blogDummyData, blogsInDB}
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { blogDummyData, blogsInDB } = require("./test_helpers");

const api = supertest(app);

let token;
let testUserId;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create a test user
  const passwordHash = await bcrypt.hash("testpassword", 10);
  const user = new User({
    username: "testuser",
    name: "Test User",
    passwordHash,
  });
  const savedUser = await user.save();
  testUserId = savedUser._id.toString();

  // Login to get token
  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "testpassword" });
  token = loginResponse.body.token;

  // Create blogs associated with the test user
  const blogObjects = blogDummyData.map((blog) => new Blog({ ...blog, user: savedUser._id }));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  console.log("done");
});

test("all blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, blogDummyData.length);
});

test("id keys exist in database", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual("id" in response.body[0], true);
});

test("post is saved to database", async () => {
  const newBlog = {
    author: "Brandon Sanderson",
    title: "TRESS OF THE EMERALD SEA",
    likes: 30,
    url: "https://www.brandonsanderson.com/pages/standalones-cosmere",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await blogsInDB();
  console.log(response);
  assert.strictEqual(response.length, blogDummyData.length + 1);
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    author: "Brandon Sanderson",
    title: "TRESS OF THE EMERALD SEA",
    likes: 30,
    url: "https://www.brandonsanderson.com/pages/standalones-cosmere",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401);

  const blogsAtEnd = await blogsInDB();
  assert.strictEqual(blogsAtEnd.length, blogDummyData.length);
});

test("blog with missing title or url isnt saved to database", async () => {
  const newBlog = {
    author: "Brandon Sanderson",
    likes: 30,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsatEnd = await blogsInDB();
  assert.strictEqual(blogsatEnd.length, blogDummyData.length);
});

test("individual blog is deleted from database", async () => {
  const blogs = await blogsInDB();

  const blogtodelete = blogs[0];
  await api
    .delete(`/api/blogs/${blogtodelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsatEnd = await blogsInDB()
  assert.strictEqual(blogsatEnd.length, blogDummyData.length - 1)
});

test("a blog can be updated", async () => {
  const blogsAtStart = await blogsInDB();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlogData = { likes: blogToUpdate.likes + 1 };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDB();
  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
});

after(async () => {
  mongoose.connection.close();
});

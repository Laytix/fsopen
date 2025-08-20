const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { blogDummyData } = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogDummyData.map((blog) => new Blog(blog));
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

test("id keys exist in database", async()=>{
  const response = await api.get("/api/blogs");
  console.log(response.body[0])
  assert.strictEqual("id" in response.body[0], true)
})
after(async () => {
  mongoose.connection.close();
});

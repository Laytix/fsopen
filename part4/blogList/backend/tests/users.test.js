const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helpers = require("./test_helpers");

const api = supertest(app);

describe("User tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("successfull creation of new user", async () => {
    const usersAtStart = await helpers.usersinDB();

    const newUser = {
      username: "joeseph",
      name: "Joe Japhone",
      password: "joe",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersatend = await helpers.usersinDB();
    assert.strictEqual(usersatend.length, usersAtStart.length + 1);

    const usernames = usersatend.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("user with password of less than 3 characters is not created", async () => {
    const usersAtStart = await helpers.usersinDB();

    const newUser = {
      username: "joeseph",
      name: "Joe Japhone",
      password: "jo",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersinDB()
    // assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});

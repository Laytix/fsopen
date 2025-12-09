const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const { error } = require("../utils/logger");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    // Check if it's a CastError (invalid ObjectId format)
    if (error.name === "CastError") {
      return response.status(400).json({ error: "invalid id format" });
    }
    // For other errors, pass to error handling middleware
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    // Get and validate token
    const token = getTokenFrom(request);
    if (!token) {
      return response.status(401).json({ error: "token missing" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    // Find user
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    // Validate request body
    if (!body.content) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    // Create and save note
    const note = new Note({
      content: body.content,
      important: Boolean(body.important) || false,
      user: user._id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("dotenv").config();
const Note = require("./models/note");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

const PORT = process.env.PORT;
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  // const id = request.params.id;
  // notes = notes.filter((note) => note.id !== id);

  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });

  response.status(204).end();
});


app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const filnote = notes.findIndex((note) => note.id == id);

  notes[filnote].important = !notes[filnote].important;

  response.json(notes[filnote]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

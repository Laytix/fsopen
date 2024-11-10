const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
// app.use(morgan("tiny"));
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));
const currentDate = new Date();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Part 3</h1>");
});

app.get("/info", (request, response) => {
  const timestamp = currentDate.toString();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                    <p>${timestamp}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id == id);

  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const name_exists = persons.find((person) => person.name == body.name);
  if (name_exists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "details missing",
    });
  }

  const personAdd = {
    name: body.name,
    number: body.number,
    id: getRandomInt(10000),
  };

  persons.concat(personAdd);
  response.json(personAdd);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

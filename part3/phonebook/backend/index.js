const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const Person = require("./model/people");

const app = express();
app.use(express.static("dist"));
const cors = require("cors");

app.use(cors());
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));
const currentDate = new Date();

app.get("/", (request, response) => {
  response.send("<h1>Part 3</h1>");
});

app.get("/info", async (request, response) => {
  const timestamp = currentDate.toString();

  const count = await Person.countDocuments({});

  response.send(`<p>Part 3 Phonebook has info for ${count} people</p>
                    <p>${timestamp}</p>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  console.log(request.id);
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  // persons = persons.filter((person) => person.id !== id);
  Person.findByIdAndDelete(request.params.id)
    .then((deletedperson) => {
      if (deletedperson) {
        console.log("Successfully deleted: ", deletedperson);
        response.status(204).end();
      } else {
        console.log("Contact not found");
      }
    })
    .catch((err) => console.error("Error deleting user: ", err));
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "details missing",
    });
  }

  Person.findOne({ name: name })
    .then((person) => {
      if (person) {
        person.number = number;

        person.save().then((savedperson) => {
          response.json(savedperson);
        });
      } else {
        const person = new Person({
          name: name,
          number: number,
          id: getRandomInt(10000),
        });

        person
          .save()
          .then((savedperson) => {
            response.json(savedperson);

          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }else if(error.name = "Validation Error"){
    return response.status(400).json({error: error.message})
  }


  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

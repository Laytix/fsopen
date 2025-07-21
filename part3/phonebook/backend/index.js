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

app.get("/info", (request, response) => {
  const timestamp = currentDate.toString();
  response.send(`<p>Part 3 Phonebook has info for ${persons.length} people</p>
                    <p>${timestamp}</p>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  console.log(request.id)
  Person.findById(request.params.id).then((person) =>{
    response.json(person)
  })
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  // persons = persons.filter((person) => person.id !== id);
  Person.findByIdAndDelete(request.params.id).then(deletedperson =>{
    if(deletedperson){
      console.log("Successfully deleted: ", deletedperson)
      response.status(204).end();
    }else{
      console.log("Contact not found")
    }
  }).catch(err => console.error("Error deleting user: ", err))

  
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post("/api/persons", (request, response) => {
  const body = request.body;


  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "details missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: getRandomInt(10000)
  })

  person.save().then( savedperson => {
    response.json(savedperson)
  })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

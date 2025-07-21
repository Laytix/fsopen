const mongoose = require("mongoose");
require("dotenv").config();

url = process.env.URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((reponse) => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.error("connection unsuccessful: ", error);
  });

const personSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

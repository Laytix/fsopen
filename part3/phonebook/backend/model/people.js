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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        // A regular expression to check for the format 'XX-XXXXXXX' or 'XXX-XXXXXXXX'
        // where 'X' is a digit and total length is 8 or more.
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It must be in the format 'XX-XXXXX' or 'XXX-XXXXXXX', and be at least 8 digits long.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

const mongoose = require('mongoose')

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const password = process.argv[2]

const url = `mongodb+srv://david-t:${password}@david-cluster.p2ehm.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=david-cluster`;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 5){

    const person = new Person({
        id: getRandomInt(10000),
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log("contact saved")
        mongoose.connection.close()
    })

}else if(process.argv.length < 4){
    Person.find({}).then(result => {
      result.forEach(contact => {
        console.log(contact)
      })
      mongoose.connection.close()
    })
}

import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/contacts";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");

  const grabNumbers = () => {
    personServices.getContacts().then((initialNumbers) => {
      console.log("promise fulfilled");
      setPersons(initialNumbers);
    });
  };

  useEffect(grabNumbers, []);

  const addNote = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: number,
      id: `${persons.length + 1}`,
    };

    personServices
      .addContacts(newContact)
      .then((response) => setPersons(persons.concat(response.data)));

    // axios.post("http://localhost:3001/persons", newContact).then((response) => {
    //   setPersons(persons.concat(response.data));
    // });
  };

  const onChangeNote = (event) => setNewName(event.target.value);
  const onChangeNumber = (event) => setNumber(event.target.value);
  const onChangeSearch = (event) => setSearch(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChangeSearch={onChangeSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addNote={addNote}
        newName={newName}
        onChangeNote={onChangeNote}
        number={number}
        onChangeNumber={onChangeNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;

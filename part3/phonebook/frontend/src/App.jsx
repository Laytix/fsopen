import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ messages: null, color: `green` });

  const grabNumbers = () => {
    personServices.getContacts().then((initialNumbers) => {
      console.log("promise fulfilled");
      setPersons(initialNumbers);
    });
  };
  useEffect(grabNumbers, []);

  const addName = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: number,
    };

    const existingContact = persons.find((person) => person.name === newName);

    if (existingContact) {
      const msg = `${newName} is already in PhoneBook, do you want to replace the number?`;
      if (window.confirm(msg)) {
        personServices
          .update(existingContact.id, newContact)
          .then(() => {
            grabNumbers();
            setMessage({
              messages: `${newContact.name}'s number has been updated`,
              color: "green",
            });
            setTimeout(() => {
              setMessage({ messages: null, color: "green" });
            }, 2000);
          })
          .catch((error) => {
            setMessage({
              messages: `Information of ${newContact.name} has already been removed from the server`,
              color: "red",
            });
            setTimeout(() => {
              setMessage({ messages: null, color: "green" });
            }, 2000);
          });
      }
    } else {
      personServices
        .addContacts(newContact)
        .then((response) => {
          setPersons(persons.concat(response));
          setMessage({ messages: `Added ${newContact.name}`, color: "green" });
          setTimeout(() => {
            setMessage({ messages: null, color: "green" });
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setMessage({
            messages: `${error.response.data.error}`,
            color: "red",
          });
          setTimeout(() => {
            setMessage({ messages: null, color: "green" });
          }, 2000);
        });
    }

    resetNewState();
  };

  const deleteContact = (person) => {
    const msg = `Delete ${person.name}`;
    if (window.confirm(msg)) {
      personServices.deletePerson(person.id).then((response) => {
        console.log(response);
        grabNumbers();
      });
    }
  };

  const onChangeName = (event) => setNewName(event.target.value);
  const onChangeNumber = (event) => setNumber(event.target.value);
  const onChangeSearch = (event) => setSearch(event.target.value);

  const resetNewState = () => {
    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} onChangeSearch={onChangeSearch} />

      <Notification message={message.messages} color={message.color} />
      <h3 className="add">Add a new</h3>
      <PersonForm
        addNote={addName}
        newName={newName}
        onChangeNote={onChangeName}
        number={number}
        onChangeNumber={onChangeNumber}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        search={search}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;

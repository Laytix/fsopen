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
      id: `${persons.length + 1}`,
    };

    const currentNames = persons.map((names) => names.name);

    if (currentNames.includes(newName)) {
      const msg = `${newName} is already in PhoneBook, do you want to replace the number?`;
      const confirm = window.confirm(msg);
      if (confirm) {
        updateContact(newContact);
      } else {
        personServices.addContacts(newContact).then((response) => {
          setPersons(persons.concat(response));
          setMessage({ messages: `Added ${newContact.name}`, color: `green` });
          console.log(message);

          setTimeout(() => {
            setMessage({ messages: null, color: `green` });
          }, 2000);
        });
      }
    } else {
      personServices.addContacts(newContact).then((response) => {
        setPersons(persons.concat(response));
        setMessage({ messages: `Added ${newContact.name}`, color: `green` });
        console.log(message);
        setTimeout(() => {
          setMessage({ messages: null, color: `green` });
        }, 2000);
      });
    }

    resetNewState();
  };

  const updateContact = (newObject) => {
    const existingContact = persons.find((p) => p.name == newObject.name);
    const existingId = existingContact.id;

    personServices
      .update(existingId, newObject)
      .then((returnedPerson) => {
        const nonduplicate = persons.filter(
          (person) => person.id !== existingId
        );
        setPersons(nonduplicate.concat(returnedPerson));
      })
      .catch((error) => {
        const msg = `Information of ${newObject.name} has already been removed from the server; ${error}`;

        setMessage({ messages: msg, color: `red` });
        setTimeout(() => {
          setMessage({ messages: null, color: `green` });
        }, 2000);
      });
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

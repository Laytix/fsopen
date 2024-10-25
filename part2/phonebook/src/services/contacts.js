import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addContacts = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`);
  return getContacts();
};

// Use put method to partially update a ressource
const update = (id, newObject) => {
  // construct the unique url of the single note to be changed
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getContacts, addContacts, deletePerson, update };

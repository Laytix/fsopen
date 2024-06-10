const Persons = ({ persons, search }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          const lowerName = person.name.toLocaleLowerCase();
          const lowerSearch = search.toLocaleLowerCase();
          return lowerName.includes(lowerSearch);
        })
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Persons;

const PersonForm = ({
  addNote,
  newName,
  onChangeNote,
  number,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={onChangeNote} />
      </div>
      <div>
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

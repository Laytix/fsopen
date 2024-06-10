const Filter = ({ search, onChangeSearch }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={onChangeSearch} />
    </div>
  );
};

export default Filter;

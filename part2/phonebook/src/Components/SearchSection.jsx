const SearchSection = ({ onChange }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <input
        name="phonebook-search"
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchSection;

export const SearchSection = ({ onChange }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={onChange} placeholder="Search..." />
    </div>
  );
};

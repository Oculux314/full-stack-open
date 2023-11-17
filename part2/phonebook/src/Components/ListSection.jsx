import ListItem from "./ListItem";

const ListSection = ({ persons, onDeleteClick }) => {
  const elements = persons.map(({ id, name, number }) => (
    <ListItem key={name} name={name} number={number} onClick={onDeleteClick} />
  ));

  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
};

export default ListSection;

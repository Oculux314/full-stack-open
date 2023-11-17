const ListItem = ({ name, number, onClick }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={() => onClick(name)}>Delete</button>
      </td>
    </tr>
  );
};

export default ListItem;

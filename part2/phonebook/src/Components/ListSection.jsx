export const ListSection = ({ persons }) => {
  const elements = persons.map((person) => (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
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

const AncSection = ({ formVariables }) => {
  const { onSubmit, inputValues, onNameChange, onNumberChange } = formVariables;
  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={onSubmit}>
        <div>
          Name:{" "}
          <input name="name" value={inputValues.name} onChange={onNameChange} />
        </div>
        <div>
          Number:{" "}
          <input
            name="phone"
            value={inputValues.number}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AncSection;

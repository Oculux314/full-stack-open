export const AddSection = ({ formVariables }) => {
  const { onSubmit, inputValues, onNameChange, onNumberChange } = formVariables;
  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={inputValues.name} onChange={onNameChange} />
        </div>
        <div>
          Number: <input value={inputValues.number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

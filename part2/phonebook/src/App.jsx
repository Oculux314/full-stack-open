import { useState } from "react";
import { SearchSection } from "./Components/SearchSection";
import { AddSection } from "./Components/AddSection";
import { ListSection } from "./Components/ListSection";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [input, setInput] = useState({ name: "", number: "" });

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setInput({ ...input, name: event.target.value });
  };

  const handleNumberChange = (event) => {
    setInput({ ...input, number: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === input.name)) {
      alert(`${input.name} is already added to phonebook`);
    } else {
      setPersons([...persons, input]);
      setInput({ name: "", number: "" });
    }
  };

  const addSectionVariables = {
    inputValues: input,
    onNameChange: handleNameChange,
    onNumberChange: handleNumberChange,
    onSubmit: handleSubmit,
  };

  const shownPersons = searchValue
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : persons;

  return (
    <div>
      <SearchSection
        value={searchValue}
        onChange={handleSearchChange}
      ></SearchSection>
      <AddSection formVariables={addSectionVariables}></AddSection>
      <ListSection persons={shownPersons}></ListSection>
    </div>
  );
};

export default App;

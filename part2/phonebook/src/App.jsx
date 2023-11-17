import { useEffect, useState } from "react";
import server from "./services/server";
import SearchSection from "./components/SearchSection";
import AncSection from "./components/AncSection";
import ListSection from "./components/ListSection";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [inputPerson, setInputPerson] = useState({ name: "", number: "" });

  useEffect(() => {
    server.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleDelete(name) {
    if (confirm(`Delete ${name}?`)) {
      const note = persons.find((person) => person.name === name);
      server.remove(note.id).then((response) => {
        setPersons(persons.filter((person) => person.name !== note.name));
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (persons.some((person) => person.name === inputPerson.name)) {
      if (
        confirm(
          `${inputPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const note = persons.find((person) => person.name === inputPerson.name);
        server.update(note.id, inputPerson).then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== note.id ? person : updatedPerson
            )
          );
        });
      }
    } else {
      server.create(inputPerson).then((newPerson) => {
        setPersons([...persons, newPerson]);
      });
    }
    setInputPerson({ name: "", number: "" });
  }

  const addSectionVariables = {
    inputValues: inputPerson,
    onNameChange: (event) => {
      setInputPerson({ ...inputPerson, name: event.target.value });
    },
    onNumberChange: (event) => {
      setInputPerson({ ...inputPerson, number: event.target.value });
    },
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
      <AncSection formVariables={addSectionVariables}></AncSection>
      <ListSection
        persons={shownPersons}
        onDeleteClick={handleDelete}
      ></ListSection>
    </div>
  );
};

export default App;

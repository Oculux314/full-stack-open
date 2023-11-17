import { useEffect, useState } from "react";
import server from "./services/server";
import notifications from "./services/notification";
import SearchSection from "./components/SearchSection";
import AncSection from "./components/AncSection";
import ListSection from "./components/ListSection";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [inputPerson, setInputPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

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
      server
        .remove(note.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.name !== note.name));
          notifications.success(setNotification, `Deleted ${note.name}`);
        })
        .catch(() => {
          notifications.error(
            setNotification,
            `Information of ${note.name} has already been removed from server`
          );
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
        const contact = persons.find(
          (person) => person.name === inputPerson.name
        );
        server
          .update(contact.id, inputPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== contact.id ? person : updatedPerson
              )
            );
            notifications.success(setNotification, `Updated ${contact.name}`);
          })
          .catch(() => {
            notifications.error(
              setNotification,
              `Information of ${contact.name} has already been removed from server`
            );
            setPersons(persons.filter((person) => person.id !== contact.id));
          });
      }
    } else {
      server
        .create(inputPerson)
        .then((newPerson) => {
          setPersons([...persons, newPerson]);
          notifications.success(setNotification, `Added ${inputPerson.name}`);
        })
        .catch((error) => {
          notifications.error(setNotification, error.response.data.error);
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
      <Notification notification={notification}></Notification>
      <ListSection
        persons={shownPersons}
        onDeleteClick={handleDelete}
      ></ListSection>
    </div>
  );
};

export default App;

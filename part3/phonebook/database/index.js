const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
  if (process.argv.length < 3) {
    throw new Error("No password provided: use `npm start <password>`");
  }

  const password = process.argv[2];
  const dbUrl = `mongodb+srv://Just:${password}@oculux.voxjd1o.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.connect(dbUrl);

  const Person = mongoose.model(
    "Person",
    new mongoose.Schema({
      name: String,
      number: String,
    })
  );

  switch (process.argv.length) {
    case 3:
      listPersons();
      break;
    case 4:
      throw new Error("No number provided");
    case 5:
      addPerson(process.argv[3], process.argv[4]);
      break;
    default:
      throw new Error("Too many arguments");
  }

  function listPersons() {
    Person.find({}).then((result) => {
      console.log("Phonebook:");
      result.forEach((person) => {
        console.log(`${person.name}: ${person.number}`);
      });
      mongoose.connection.close();
    });
  }

  function addPerson(person, number) {
    const newPerson = new Person({
      name: person,
      number: number,
    });

    newPerson.save().then(() => {
      console.log(`Added ${person}: ${number} to phonebook\n`);
      mongoose.connection.close();
    });
  }
}

main().catch((error) => {
  console.error(error.code, error.message);
});

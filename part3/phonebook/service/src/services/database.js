const mongoose = require("mongoose");
const Person = require("../models/person");

mongoose.set("strictQuery", false);
const password = process.env.PASSWORD;
const url = process.env.MONGODB_URI?.replace("<password>", password);
if (!url) {
  console.log(password);
  console.error("Missing MongoDB URI or password");
  process.exit(1);
}

function createInteraction(callback) {
  return async function (...args) {
    await mongoose.connect(url);
    const data = await callback(...args);
    mongoose.connection.close();
    return data;
  };
}

const getAll = createInteraction(async () => {
  return await Person.find({});
});

const getPersonById = createInteraction(async (id) => {
  const test = await Person.findById(id);
  console.log(test);
  return test;
});

const getPersonByName = createInteraction(async (name) => {
  return (await Person.find({ name }))[0];
});

const deletePerson = createInteraction((id) => {
  return Person.findByIdAndDelete(id);
});

const createPerson = createInteraction(async (body) => {
  const person = new Person(body);
  await person.save();
  return await getPersonByName(body.name);
});

const updatePerson = createInteraction(async (id, body) => {
  return Person.findByIdAndUpdate(id, body, { new: true });
});

module.exports = {
  getAll,
  getPersonById,
  getPersonByName,
  deletePerson,
  createPerson,
  updatePerson,
};

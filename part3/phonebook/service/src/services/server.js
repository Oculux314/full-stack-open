const { response } = require("express");
const database = require("./database");

// Helper
function showError(res, message = "unknown error", code = 400) {
  const json = { error: message };
  console.error(json);
  res.status(code).json(json);
}

async function sendInfo(res, persons) {
  const lines = [
    `<p>Phonebook has info for ${persons.length} people</p>`,
    `<p>${new Date()}</p>`,
  ];
  res.send(lines.join("\n"));
}

async function getAllPersons(res) {
  res.json(await database.getAll());
}

async function getPerson(res, id) {
  const person = await database.getPersonById(id);
  if (!person) return showError(res, "person not found", 404);
  res.json(person);
}

async function deletePerson(res, id) {
  await database.deletePerson(id);
  res.status(204).end();
}

function bodyCheck(res, body) {
  if (!body) return showError(res, "missing body");
  if (!body.name) return showError(res, "missing name");
  if (!body.number) return showError(res, "missing number");
  return true;
}

async function nameCheck(res, name) {
  if (!name) return showError(res, "missing name");
  if (await database.getPersonByName(name))
    return showError(res, "name must be unique");
  return true;
}

async function addPerson(res, body) {
  if (!bodyCheck(res, body) || !(await nameCheck(res, body.name))) return;
  res.status(201).json(await database.createPerson(body));
}

async function updatePerson(res, id, body) {
  const person = await database.getPersonById(id);
  if (!person) return showError(res, "person not found", 404);
  if (!bodyCheck(res, body)) return;
  res.json(await database.updatePerson(id, body));
}

function sendUnknownEndpoint(res) {
  showError(res, "unknown endpoint", 404);
}

function handleError(error, res) {
  if (error.name === "CastError") {
    return showError(res, "malformed id", 400);
  }

  showError(res, "internal server error", 500);
}

module.exports = {
  sendInfo,
  getAllPersons,
  getPerson,
  deletePerson,
  addPerson,
  updatePerson,
  sendUnknownEndpoint,
  handleError,
};

const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(morgan(formatLog));

function formatLog(tokens, req, res) {
  const bodyLog = req.method === "POST" ? JSON.stringify(req.body) : "";

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    bodyLog,
  ].join(" ");
}

let persons = JSON.parse(fs.readFileSync("./db.json", "utf8"));
let maxId = persons.reduce(
  (max, person) => (person.id > max ? person.id : max),
  0
);

app.get("/info", (_, res) => {
  const lines = [
    `<p>Phonebook has info for ${persons.length} people</p>`,
    `<p>${new Date()}</p>`,
  ];
  res.send(lines.join("\n"));
});

app.get("/api/persons", (_, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

function syncFile() {
  fs.writeFileSync("./db.json", JSON.stringify(persons));
}

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);
  syncFile();
  res.status(204).end();
});

function generateId() {
  return maxId++;
}

function response(res, message, code) {
  if (!message) message = "unknown error";
  if (!code) code = 400;

  return res.status(code).json({
    error: message,
  });
}

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // Error handling
  if (!body) return response(res, "missing body");
  if (!body.name) return response(res, "missing name");
  if (!body.number) return response(res, "missing number");
  if (persons.find((person) => person.name === body.name)) {
    return response(res, "name must be unique");
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];
  syncFile();
  res.json(person);
});

// Catch requests to undefined endpoints
app.use((_, res, next) => {
  response(res, "unknown endpoint", 404);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

const server = require("./server");
const express = require("express");
const morgan = require("morgan");
const { formatLog } = require("./utils");

function attachPreuses(app) {
  app.use(express.json());
  app.use(morgan(formatLog));
}

function createRoutes(app) {
  app.get("/info", (_, res, next) => {
    server.sendInfo(res, persons).catch(next);
  });

  app.get("/api/persons", (_, res, next) => {
    server.getAllPersons(res).catch(next);
  });

  app.get("/api/persons/:id", (req, res, next) => {
    server.getPerson(res, req.params.id).catch(next);
  });

  app.delete("/api/persons/:id", (req, res, next) => {
    server.deletePerson(res, req.params.id).catch(next);
  });

  app.post("/api/persons", (req, res, next) => {
    server.addPerson(res, req.body).catch(next);
  });

  app.put("/api/persons/:id", (req, res, next) => {
    server.updatePerson(res, req.params.id, req.body).catch(next);
  });
}

function attachPostuses(app) {
  // Catch-all endpoint
  app.use((_, res, next) => {
    server.sendUnknownEndpoint(res);
    next();
  });

  // Error handler
  app.use((error, _, res, next) => {
    console.error(error.message);
    server.handleError(error, res);
    next();
  });
}

module.exports = { attachPreuses, createRoutes, attachPostuses };

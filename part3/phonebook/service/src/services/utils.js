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

module.exports = { formatLog };

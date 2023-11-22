require("dotenv").config();
const express = require("express");
const {
  attachPreuses,
  createRoutes,
  attachPostuses,
} = require("./services/routes");

const PORT = process.env.PORT || 3001;
const app = express();

attachPreuses(app);
createRoutes(app);
attachPostuses(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

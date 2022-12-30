// The following template was used for this project on init:
// https://github.com/BogDAAAMN/deta-typescript-express-starter

import express from "express";

const app = express();

// Get / endpoint
app.get("/", (req, res) =>
  res.send("This is the API for following application on GitHub: https://github.com/sanqro/chat")
);

// Listen on port 3000 if running locally
if (!process.env.DETA_RUNTIME) {
  // eslint-disable-next-line no-console
  app.listen(3001, () => console.log("Started on http://localhost:3001"));
}

module.exports = app;

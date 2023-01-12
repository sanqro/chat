// The following template was used for this project on init:
// https://github.com/BogDAAAMN/deta-typescript-express-starter

import express from "express";
import cors from "cors";
import test from "./routes/test";

// express setup
const app = express();
app.use(express.json()); // parses requests to json
app.use(cors()); // Cross Origin Resource Sharing
app.disable("etag"); // disables automatic caching

// routes
app.use("/test", test);

// root endpoint
app.get("/", (req, res) =>
  res.status(200).json({
    msg: "This is the API for following application on GitHub: https://github.com/sanqro/chat"
  })
);

// Listen on port 3000 if running locally
if (!process.env.DETA_RUNTIME) {
  // eslint-disable-next-line no-console
  app.listen(3001, () => console.log("Started on http://localhost:3001"));
}

module.exports = app;

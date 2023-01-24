/* eslint-disable no-console */
// The following template was used for this project on init:
// https://github.com/BogDAAAMN/deta-typescript-express-starter

import express from "express";
import cors from "cors";
import keys from "./routes/keys";
import auth from "./routes/auth";
import users from "./routes/users";
import chatroom from "./routes/chatroom";
import checkAuth from "./middleware/checkAuth";
import checkUser from "./middleware/checkUser";

// express setup
const app = express();
app.use(express.json()); // parses requests to json
app.use(cors()); // Cross Origin Resource Sharing
app.disable("etag"); // disables automatic caching

// routes
app.use("/keys", keys);
app.use("/auth", auth);
app.use("/users", checkAuth, users);
app.use("/chatroom", checkUser, chatroom);

// root endpoint
app.get("/", (req, res) =>
  res.status(200).json({
    msg: "This is the API for following application on GitHub: https://github.com/sanqro/chat"
  })
);

// Listen on port 3000 if running locally
if (!process.env.DETA_RUNTIME) {
  app.listen(3001, () => console.log("Started on http://localhost:3001"));
}

module.exports = app;

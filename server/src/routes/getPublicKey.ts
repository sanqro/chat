/* eslint-disable no-console */
import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IUsername } from "../interfaces/interfaces";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

router.get("/getPublicKey", async (req, res) => {
  try {
    const user: IUsername = req.body as IUsername;

    const existing = await users.get(user.username);
    if (existing === null) {
      res.status(409).json({
        error: "There is no such user!"
      });
      return false;
    } else {
      const fetchUser = await users.get(user.username);
      const publicKey = fetchUser.publicKey;
      res.status(201).json(publicKey);
    }
  } catch (err) {
    res.status(503).json({ error: "Error with the database!" });
  }
});

export default router;

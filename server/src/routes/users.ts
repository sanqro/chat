/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { FetchResponse } from "deta/dist/types/types/base/response";

//import { IUsername } from "../interfaces/interfaces";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

router.get("/users", async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let usersArray: string[] = new Array(0);

    const user: FetchResponse = await users.fetch();
    for (let index = 0; index < user.count; index++) {
      usersArray[index] = user.items[index].key as string;
    }
    res.json(usersArray);
  } catch (err) {
    res.status(503).json(err);
  }
});

export default router;

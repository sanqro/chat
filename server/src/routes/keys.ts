/* eslint-disable no-console */
import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IUsername } from "../interfaces/interfaces";
import { generateKeyPair } from "crypto";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

router.get("/getPublic", async (req, res) => {
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

router.get("/generateKeypair", (req, res) => {
  generateKeyPair(
    "rsa",
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      }
    },
    (err: Error, publicKey: string, privateKey: string) => {
      if (err !== null) {
        res.status(500).send(err.message);
      } else {
        res.send({ publicKey, privateKey });
      }
    }
  );
});

export default router;
/* eslint-disable no-console */
import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IUsername } from "../interfaces/interfaces";
import { generateKeyPair } from "crypto";
import checkAuth from "../middleware/checkAuth";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

router.get("/getPublic", checkAuth, async (req, res) => {
  try {
    const user: IUsername = req.body as IUsername;

    const existing = await users.get(user.username);
    if (existing === null) {
      res.status(409).json({
        error: "There is no such user!"
      });
      return false;
    } else {
      const publicKey = existing.publicKey;
      res.status(201).json(publicKey);
    }
  } catch (err) {
    err instanceof Error
      ? res.status(409).json({ message: err.message, success: false })
      : res.status(409).json({ message: "Unknown Error occured!", success: false });
  }
});

router.get("/generateKeypair", (req, res) => {
  const convertToOneLine = (text: string) => text.replace(/(\r\n|\n|\r)/gm, "");
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
        publicKey = convertToOneLine(publicKey);
        privateKey = convertToOneLine(privateKey);
        res.send({ publicKey, privateKey });
      }
    }
  );
});

export default router;

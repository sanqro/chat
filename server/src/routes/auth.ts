import express from "express";
import argon2 from "argon2";
import { Deta } from "deta";
import jwt from "jsonwebtoken";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { ILoginFormData, IRegistrationFormData } from "../interfaces/interfaces";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const auth = deta.Base("users");

// jwt setup

const jwtSecret: string = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const registrationData: IRegistrationFormData = req.body as IRegistrationFormData;
    const convertToOneLine = (text: string) => text.replace(/(\r\n|\n|\r)/gm, "");
    const existing = await auth.get(registrationData.username);

    if (existing !== null) {
      res.status(409).json({
        error: "Username already taken!"
      });
      return false;
    }

    const privateKeyHash = await argon2.hash(convertToOneLine(registrationData.privateKey));
    const registerJsonData = {
      key: registrationData.username,
      privateKey: privateKeyHash,
      publicKey: registrationData.publicKey
    };
    const toInsert = await auth.insert(registerJsonData);
    res.status(201).json({
      username: toInsert.key,
      publicKey: toInsert.publicKey,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: "Error with the database!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginData: ILoginFormData = req.body as ILoginFormData;

    const existing = await auth.get(loginData.username);
    const privateKey = existing.privateKey as string;

    if (existing === null) {
      res.status(409).json({
        error: "There is no such user!"
      });
      return false;
    }

    if (await argon2.verify(privateKey, loginData.privateKey)) {
      const token = jwt.sign(
        { username: existing },
        jwtSecret,
        { expiresIn: "3600s" } // expiration after 60min
      );
      res.status(200).json({ token, success: true });
    } else {
      res.status(401).json({
        error: "Wrong Credentials!",
        success: false
      });
    }
  } catch (err) {
    res.status(503).json({ error: "Error with the database!" });
  }
});

export default router;

import express from "express";
import { generateKeyPair } from "crypto";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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

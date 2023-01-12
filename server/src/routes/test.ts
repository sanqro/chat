import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { FetchResponse } from "deta/dist/types/types/base/response";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const testDB = deta.Base("testDB");

router.get("/info", (req, res) => {
  res.status(200).send({
    info: "This is a simple route for doing tests. There is no use for it in the main application."
  });
});

router.post("/store", async (req, res) => {
  const { name, age } = req.body;
  const toCreate = { name, age };
  const toInsert = await testDB.put(toCreate);
  res.status(200).json({ toInsert });
});

router.get("/readall", async (req, res) => {
  const all: FetchResponse = await testDB.fetch();
  res.status(200).json(all);
});

export default router;

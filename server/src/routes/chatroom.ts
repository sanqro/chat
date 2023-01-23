/* eslint-disable no-console */
import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IChatroomData, IEncryptedMessage, IParticipant } from "../interfaces/interfaces";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const chatroom = deta.Base("chatroom");
const users = deta.Base("users");

router.post("/create", async (req, res) => {
  try {
    const participantArray: IParticipant[] = req.body.participants;
    const msgArray: IEncryptedMessage[] = req.body.messages;

    let key = "";

    for (let index = 0; index < participantArray.length; index++) {
      key += participantArray[index].username as string;

      const existing = await users.get(participantArray[index].username);
      if (existing === null) {
        res.status(409).json({
          error: "Failed to create the chatroom. There is no such user!"
        });
        return false;
      }
    }

    const chatroomJsonData: IChatroomData = {
      key: key,
      participantArray: participantArray,
      msgArray: msgArray
    };

    const jsonString = JSON.stringify(chatroomJsonData);
    await chatroom.insert(JSON.parse(jsonString));

    res.status(201).json({
      participants: participantArray,
      msgArray: msgArray,
      success: true
    });
  } catch (err) {
    res.status(201).json({ error: err.message });
  }
});

export default router;

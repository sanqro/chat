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

router.post("/create", async (req, res) => {
  try {
    const participantArray: IParticipant[] = req.body.participants;
    const msgArray: IEncryptedMessage[] = req.body.messages;

    const chatroomJsonData: IChatroomData = {
      participantArray: participantArray,
      msgArray: msgArray
    };

    let key = "";

    for (let index = 0; index < participantArray.length; index++) {
      key += participantArray[index].username as string;
    }

    const jsonString = JSON.stringify(chatroomJsonData);
    await chatroom.insert(key, JSON.parse(jsonString));

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

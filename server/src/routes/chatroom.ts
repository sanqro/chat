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
    let participantArraySorted: IParticipant[] = new Array(0);

    if (participantArray[0].username.localeCompare(participantArray[1].username) < 0) {
      participantArraySorted = participantArray;
    } else if (participantArray[0].username.localeCompare(participantArray[1].username) > 0) {
      participantArraySorted[0] = participantArray[1];
      participantArraySorted[1] = participantArray[0];
    }

    let key = "";

    for (let index = 0; index < participantArraySorted.length; index++) {
      key += participantArraySorted[index].username;

      const existing = await users.get(participantArraySorted[index].username);
      if (existing === null) {
        res.status(409).json({
          error: "Failed to create the chatroom. There is no such user!"
        });
        return false;
      }
    }

    const chatroomJsonData: IChatroomData = {
      key: key,
      participantArray: participantArraySorted,
      msgArray: msgArray
    };

    const jsonString = JSON.stringify(chatroomJsonData);
    await chatroom.insert(JSON.parse(jsonString));

    res.status(201).json({
      participants: participantArraySorted,
      msgArray: msgArray,
      success: true
    });
  } catch (err) {
    res.status(201).json({ error: err.message });
  }
});

export default router;

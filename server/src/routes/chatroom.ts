import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IChatroomData, IEncryptedMessage, IParticipant } from "../interfaces/interfaces";
import checkUser from "../middleware/checkUser";

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

    // Bascially copied this function from here: dev.to/slimpython/sort-array-of-json-object-by-key-value-easily-with-javascript-3hke
    const participantArraySorted: IParticipant[] = participantArray.sort((a, b) => {
      if (a.username < b.username) return -1;
    });

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
    res.status(409).json({ error: err.message });
  }
});

router.post("/delete", checkUser, async (req, res) => {
  try {
    const key = req.body.key;
    const existing = chatroom.get(key);

    if (existing === null) {
      res.status(409).json({
        error: "Failed to delete chatroom. This chatroom does not exist!"
      });
    } else {
      await chatroom.delete(key);
    }
    res.status(201).json({
      message: "Deleted chatroom",
      success: true
    });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

export default router;

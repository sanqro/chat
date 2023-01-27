import express from "express";
import { Deta } from "deta";
const router = express.Router();

// dotenv variable setup
import * as dotenv from "dotenv";
import path from "path";
import { IEncryptedMessage, IParticipant } from "../interfaces/interfaces";
import checkUser from "../middleware/checkUser";
import { ObjectType } from "deta/dist/types/types/basic";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// deta setup
const projectKey: string = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const chatroom = deta.Base("chatroom");
const users = deta.Base("users");

router.post("/create", async (req, res) => {
  try {
    const participantArray: IParticipant[] = req.body.participants;
    const msgArray: IEncryptedMessage[] | null = req.body.messages;

    // Bascially copied this function from here:
    //dev.to/slimpython/sort-array-of-json-object-by-key-value-easily-with-javascript-3hke
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

    const chatroomJsonData = {
      key: key,
      participantArray: participantArraySorted,
      msgArray: msgArray
    };

    await chatroom.insert(chatroomJsonData);

    res.status(201).json({
      participants: participantArraySorted,
      msgArray: msgArray,
      success: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
});

router.post("/delete", checkUser, async (req, res) => {
  try {
    const key = req.body.key;
    const existing = chatroom.get(key);

    if (existing === null) {
      res.status(404).json({
        error: "Failed to delete chatroom. This chatroom does not exist!"
      });
    } else {
      await chatroom.delete(key);
    }
    res.status(200).json({
      message: "Deleted chatroom",
      success: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
});

router.post("/send", checkUser, async (req, res) => {
  try {
    const newMsg: IEncryptedMessage = req.body.message;
    const key: string = req.body.key;

    const existing: ObjectType = await chatroom.get(key);

    if (existing === null) {
      res.status(404).json({
        error: "Failed to send message! This chatroom does not exist!",
        success: false
      });
      return false;
    }

    const currentMsg = existing.msgArray;
    (currentMsg as IEncryptedMessage[]).push(newMsg);

    existing.msgArray = currentMsg;

    delete existing.key;

    const updateRes = await chatroom.update(existing, key);

    if (updateRes !== null) {
      throw new Error("There was an issue sending your message!");
    }

    res.status(201).json({
      message: "Sent message!",
      success: true
    });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message, success: false })
      : res.status(500).json({ message: "Unknown Error occured!", success: false });
  }
});

router.post("/getMessages", checkUser, async (req, res) => {
  try {
    const key: string = req.body.key;

    const existing: ObjectType = await chatroom.get(key);

    if (existing === null) {
      res.status(204).json({
        message: "Failed to get the messages! This chatroom does not exist!",
        success: false
      });
      return false;
    }

    delete existing.key && existing.participantArray;

    res.status(201).json({
      messages: existing.msgArray,
      success: true
    });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message, success: false })
      : res.status(500).json({ message: "Unknown Error occured!", success: false });
  }
});

export default router;

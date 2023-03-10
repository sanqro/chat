import jwt from "jsonwebtoken";
import { IChatroomData, IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function checkUser(req: any, res: any, next: any) {
  try {
    // dotenv variable setup
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });

    const token: string = req.headers.authorization;
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);

    // deta setup
    const projectKey: string = process.env.PROJECT_KEY;
    const deta = Deta(projectKey);
    const chatroomTable = deta.Base("chatroom");

    // check if user exists
    const username: string = (jwtData as IJWTPayload).username;

    const chatroom: IChatroomData = await chatroomTable.get(req.body.key);
    if (chatroom === null) {
      res.status(204).json({});
      return false;
    }

    if (
      chatroom.participantArray[0].username != username &&
      chatroom.participantArray[1].username != username
    ) {
      throw new Error("Username in token and username in requested data are not the same 🤨");
    }

    next();
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message, success: false })
      : res.status(500).json({ message: "Unknown Error occured!", success: false });
  }
}

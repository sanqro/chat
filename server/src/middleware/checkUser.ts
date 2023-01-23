import jwt from "jsonwebtoken";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";

export default async function checkUser(req: any, res: any, next: any) {
  try {
    // dotenv variable setup
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });

    const token: string = req.headers.authorization;
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);

    // check if user exists
    const username: string = (jwtData as IJWTPayload).username;

    if (username !== req.body.username)
      throw new Error("Username in token and username in request are not the same🤨");

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ msg: error.message, success: false });
    } else {
      res.status(401).json({ msg: "Unknown error occured!", success: false });
    }
  }
}

import jwt from "jsonwebtoken";
import { Deta } from "deta";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function checkAuth(req: any, res: any, next: any) {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);

    // dotenv variable setup
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });

    // deta
    const projectKey: string = process.env.PROJECT_KEY;
    const deta = Deta(projectKey);
    const users = deta.Base("users");

    // check if user exists
    const username: string = (jwtData as IJWTPayload).username;
    const existing = await users.get(username);
    if (existing === null) throw new Error("No such user found");

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ msg: error.message, success: false });
    } else {
      res.status(401).json({ msg: "Unknown error occured!", success: false });
    }
  }
}

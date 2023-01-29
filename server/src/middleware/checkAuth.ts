import jwt from "jsonwebtoken";
import { Deta } from "deta";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function checkAuth(req: any, res: any, next: any) {
  try {
    const token: string = req.headers.authorization;
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
    if (existing === null) {
      res.status(401).json({
        message: "The username in your token's claims does not exist.",
        success: false
      });
      return false;
    }

    next();
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message, success: false })
      : res.status(500).json({ message: "Unknown Error occured!", success: false });
  }
}

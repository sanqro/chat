import { JwtPayload } from "jsonwebtoken";

export interface IRegistrationFormData {
  username: string;
  publicKey: string;
  privateKey: string;
}

export interface ILoginFormData {
  username: string;
  privateKey: string;
}

export interface IUsername {
  username: string;
  publicKey?: string;
}

export interface IJWTPayload extends JwtPayload {
  username: string;
  expiresIn: string;
}

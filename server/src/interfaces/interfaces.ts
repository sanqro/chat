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
export interface IEncryptedMessage {
  msg: string;
  author: string;
  dateTime: Date;
}

export interface IParticipant {
  username: string;
  publicKey: string;
}

export interface IChatroomData {
  participantArray?: IParticipant[];
  msgArray?: IEncryptedMessage[];
}

export interface IJWTPayload extends JwtPayload {
  username: string;
}

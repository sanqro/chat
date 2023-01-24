import { ObjectType } from "deta/dist/types/types/basic";
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
export interface IEncryptedMessage extends ObjectType {
  msg: string;
  author: string;
  dateTime: string;
}

export interface IParticipant extends ObjectType {
  username: string;
  publicKey: string;
}

export interface IChatroomData {
  key: string;
  participantArray?: IParticipant[];
  msgArray?: IEncryptedMessage[];
}

export interface IJWTPayload extends JwtPayload {
  username: string;
}

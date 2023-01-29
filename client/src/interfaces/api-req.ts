export interface ILoginFormData {
  username: string;
  privateKey: string;
}

export interface IRegistrationFormData {
  username: string;
  publicKey: string;
  privateKey: string;
}

export interface IEncryptedMessage {
  msg: string;
  author: string;
  dateTime: number | string;
}

export interface IParticipant {
  username: string;
  publicKey: string;
}

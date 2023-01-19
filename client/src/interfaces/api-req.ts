export interface ILoginFormData {
  username: string;
  privateKey: string;
}

export interface IRegistrationFormData {
  username: string;
}

export interface IEncryptedMessage {
  msg: string;
  author: string;
  dateTime: Date;
}

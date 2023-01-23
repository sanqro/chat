import { IEncryptedMessage } from "./api-req";

export interface ILoginResponse {
  success: boolean;
  authToken?: string;
}

export interface IRegistrationResponse {
  success: boolean;
  privateKey?: string;
}

export interface INewEncryptedMessages {
  msgList: IEncryptedMessage[];
}

export interface IUsersListResponse {
  usersList: string[];
}

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
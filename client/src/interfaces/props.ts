export interface IBigButton {
  children: string;
  destination: string;
}

export interface IInputField {
  type: string;
  placeholder: string;
}

export interface ICopyBox {
  placeholder: string;
  children: string;
}

export interface ISubmitButton {
  children: string;
}

export interface ISearchResult {
  username: string;
  publicKey?: string;
}

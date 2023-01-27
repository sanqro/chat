import React, { MouseEvent } from "react";
import { IEncryptedMessage } from "../interfaces/api-req";
import * as crypto from "crypto";

function SendMessageButton() {
  const authToken = sessionStorage.getItem("chatapp_token");
  const msgAuthor = sessionStorage.getItem("logged_in_as");

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const chatroomKey = sessionStorage.getItem("current_chat");

    const msgObj: IEncryptedMessage = {
      msg: await encryptMessage(
        (document.getElementById("messageInput") as HTMLInputElement).value as string
      ),
      author: msgAuthor as string,
      dateTime: Date.now()
    };

    // check if there is a message to send
    if (msgObj.msg.trim() == "") return;

    const response: Response = await fetch("https://chatapp.deta.dev/chatroom/send", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken as string
      },
      body: JSON.stringify({
        message: msgObj,
        key: chatroomKey
      })
    });

    try {
      const responseJson = await response.json();
      if (!responseJson.success) throw new Error(responseJson.message);
      (document.getElementById("messageInput") as HTMLInputElement).value = "";
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occured!");
    }
  };

  const encryptMessage = async (message: string) => {
    const currentChat = sessionStorage.getItem("current_chat") as string;
    const loggedInAs = sessionStorage.getItem("logged_in_as") as string;
    const chatPartner = currentChat.replace(loggedInAs, "");

    // get the keys
    const publicKeyString = (await getPublicKey(chatPartner)) as string;
    const privateKeyString = sessionStorage.getItem("private_key") as string;

    // parse into KeyObject
    const publicKey = crypto.createPublicKey(publicKeyString);
    const privateKey = crypto.createPrivateKey(privateKeyString);

    // calculate shared key
    const sharedKey = crypto.diffieHellman({ privateKey, publicKey });
    console.warn(sharedKey);

    return message;
  };

  const getPublicKey = async (username: string) => {
    const authToken = sessionStorage.getItem("chatapp_token") as string;
    const response: Response = await fetch("https://chatapp.deta.dev/keys/getPublic/" + username, {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      }
    });

    try {
      const responseJson = await response.json();
      return responseJson.publicKey as string;
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="h-fit px-4 py-2 bg-blue-600 text-xl rounded-md text-white"
    >
      Send
    </button>
  );
}

export default SendMessageButton;

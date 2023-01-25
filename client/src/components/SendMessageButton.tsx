import React, { MouseEvent } from "react";
import { IEncryptedMessage } from "../interfaces/api-req";

function SendMessageButton() {
  const msgToSend = (document.getElementById("messageInput") as HTMLInputElement).value;
  const authToken = sessionStorage.getItem("chatapp_token");
  const chatroomKey = sessionStorage.getItem("current_chat");
  const msgAuthor = sessionStorage.getItem("logged_in_as");

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const msgObj: IEncryptedMessage = {
      msg: msgToSend,
      author: msgAuthor as string,
      dateTime: Date.now().toString()
    };

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
      // msgToSend.value = "";
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occured!");
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

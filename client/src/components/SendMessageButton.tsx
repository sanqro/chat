import React, { MouseEvent } from "react";
import { IEncryptedMessage } from "../interfaces/api-req";

function SendMessageButton() {
  const authToken = sessionStorage.getItem("chatapp_token");
  const msgAuthor = sessionStorage.getItem("logged_in_as");

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const chatroomKey = sessionStorage.getItem("current_chat");

    // abort function if no chat is open
    if (!chatroomKey) return;

    const msgObj: IEncryptedMessage = {
      msg: (document.getElementById("messageInput") as HTMLInputElement).value,
      author: msgAuthor as string,
      dateTime: Date.now()
    };

    // abort function if no message written
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

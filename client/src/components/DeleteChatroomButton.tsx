import React, { MouseEvent } from "react";

function DeleteChatroomButton() {
  const authToken = sessionStorage.getItem("chatapp_token");

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const chatroomKey = sessionStorage.getItem("current_chat");

    const response: Response = await fetch("https://chatapp.deta.dev/chatroom/delete", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken as string
      },
      body: JSON.stringify({
        key: chatroomKey
      })
    });

    try {
      const responseJson = await response.json();
      if (!responseJson.success) throw new Error(responseJson.message);
      alert("Deleted chatroom successfully!");
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
      Delete Chatroom
    </button>
  );
}

export default DeleteChatroomButton;

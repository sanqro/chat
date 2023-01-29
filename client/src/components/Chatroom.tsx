import React from "react";
import DeleteChatroomButton from "./DeleteChatroomButton";
import MessageInputField from "./MessageInputField";
import Messages from "./Messages";

function Chatroom() {
  return (
    <div className="flex flex-col h-screen grow">
      <DeleteChatroomButton />
      <Messages />
      <MessageInputField />
    </div>
  );
}

export default Chatroom;

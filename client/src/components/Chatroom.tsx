import React from "react";
import MessageInputField from "./MessageInputField";
import Messages from "./Messages";

function Chatroom() {
  return (
    <div className="flex flex-col h-screen grow">
      <Messages />
      <MessageInputField />
    </div>
  );
}

export default Chatroom;

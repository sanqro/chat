import React from "react";
import MessageInputField from "./MessageInputField";
import Messages from "./Messages";

function Chatroom() {
  return (
    <div className="flex flex-col max-h-screen grow">
      <Messages />
      <MessageInputField />
    </div>
  );
}

export default Chatroom;

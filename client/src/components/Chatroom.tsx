import React from "react";
import DeleteChatroomButton from "./DeleteChatroomButton";
import MessageInputField from "./MessageInputField";
import Messages from "./Messages";
import ToggleConstantRequestsButton from "./ToggleConstantRequestsButton";

function Chatroom() {
  return (
    <div className="flex flex-col h-screen grow">
      <div className="flex flex-row">
        <ToggleConstantRequestsButton />
        <DeleteChatroomButton />
      </div>
      <Messages />
      <MessageInputField />
    </div>
  );
}

export default Chatroom;

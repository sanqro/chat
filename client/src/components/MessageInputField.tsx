import React from "react";
import SendMessageButton from "./SendMessageButton";

function MessageInputField() {
  return (
    <div className="flex flex-row space-x-5 py-10 px-8 items-center">
      <input
        type="text"
        id="messageInput"
        placeholder="Enter message"
        className="grow h-fit outline-none py-2 px-5 text-lg border border-black rounded-md"
      />
      <SendMessageButton />
    </div>
  );
}

export default MessageInputField;

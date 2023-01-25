import React from "react";
import { IEncryptedMessage } from "../interfaces/api-req";

function ChatMessage(props: IEncryptedMessage) {
  return (
    <div className="bg-white p-4">
      <p className="text-gray-700">{props.msg}</p>
      <div className="text-gray-500 text-xs">{props.author}</div>
      <div className="text-gray-500 text-xs">{props.dateTime}</div>
    </div>
  );
}

export default ChatMessage;

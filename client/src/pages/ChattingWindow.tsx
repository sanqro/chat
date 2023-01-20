import React from "react";
import Chatroom from "../components/Chatroom";
import ChatroomsSearch from "../components/ChatroomsSearch";

function ChattingWindow() {
  return (
    <main className="flex flex-row justify-start min-h-full max-h-screen min-w-full divide-x-4 p-0">
      <ChatroomsSearch />
      <Chatroom />
    </main>
  );
}

export default ChattingWindow;

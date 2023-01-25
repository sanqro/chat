import React, { useEffect, useState } from "react";
import { IEncryptedMessage } from "../interfaces/api-req";
import MessageBox from "./MessageBox";

const Messages = () => {
  const [messages, setMessages] = useState<IEncryptedMessage[]>([]);

  const authToken = sessionStorage.getItem("chatapp_token") as string;
  const currentChat = sessionStorage.getItem("current_chat") as string;
  let msgBoxList;

  const fetchMessages = async () => {
    if (currentChat !== null) {
      const response = await fetch("https:///chatapp.deta.dev/chatroom/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authToken
        },
        body: JSON.stringify({
          currentChat
        })
      });

      try {
        const responseJson: IEncryptedMessage[] = await response.json();
        setMessages(responseJson);
      } catch (error) {
        error instanceof Error
          ? console.error(error.message)
          : console.error("Unknown error occurred");
      }
    } else {
      // create chatroom
    }

    msgBoxList = messages.map((messageObj) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <MessageBox
          msg={messageObj.msg}
          author={messageObj.author}
          dateTime={messageObj.dateTime}
        />
      );
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      fetchMessages();
    }
  }, []);

  return <div className="grow bg-blue-500">{msgBoxList}</div>;
};

export default Messages;

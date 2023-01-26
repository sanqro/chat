import React, { useEffect, useState } from "react";
import { IEncryptedMessage, IParticipant } from "../interfaces/api-req";
import MessageBox from "./MessageBox";

const Messages = () => {
  const [messages, setMessages] = useState<IEncryptedMessage[]>([
    {
      msg: "Loading messages . . .",
      author: "Loading author . . .",
      dateTime: 123
    }
  ]);

  const authToken = sessionStorage.getItem("chatapp_token") as string;
  const currentChat = sessionStorage.getItem("current_chat") as string;
  const loggedInAs = sessionStorage.getItem("logged_in_as") as string;

  const fetchMessages = async () => {
    if (currentChat) {
      const response = await fetch("http://localhost:3001/chatroom/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authToken
        },
        body: JSON.stringify({
          key: currentChat
        })
      });

      try {
        const responseJson = await response.json();
        setMessages(responseJson.messages);

        if (responseJson.error.includes("This chatroom does not exist")) {
          const chatPartner = currentChat.replace(loggedInAs, "");

          const publicKeyA = (await getPublicKey(loggedInAs)) as string;
          const publicKeyB = (await getPublicKey(chatPartner)) as string;

          const publicKeyArray: string[] = [publicKeyA, publicKeyB];

          const usernameArray: string[] = [loggedInAs, chatPartner];

          const participantArray: IParticipant[] = [
            {
              username: usernameArray[0],
              publicKey: publicKeyArray[0]
            },
            {
              username: usernameArray[1],
              publicKey: publicKeyArray[1]
            }
          ];

          createChatroom(participantArray);
        }
      } catch (error) {
        error instanceof Error
          ? console.error(error.message)
          : console.error("Unknown error occurred");
      }
    }
  };

  const msgBoxList = messages.map((messageObj) => {
    return (
      <li className="bg-blue-500" key={messages.indexOf(messageObj)}>
        <MessageBox
          msg={messageObj.msg}
          author={messageObj.author}
          dateTime={messageObj.dateTime}
        />
      </li>
    );
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getPublicKey = async (username: string) => {
    try {
      const response = await fetch("http://localhost:3001/keys/getPublic/" + username, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        }
      });
      return (await response.json()) as string;
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
    }
  };

  const createChatroom = async (participantArray: IParticipant[]) => {
    try {
      await fetch("https://chatapp.deta.dev/chatroom/create", {
        method: "POST",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          participants: participantArray
        })
      });
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
    }
  };

  return (
    <div className="grow bg-black">
      <ul className="flex flex-col justify-start">{msgBoxList}</ul>
    </div>
  );
};

export default Messages;

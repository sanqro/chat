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
    {
      const chatPartner = currentChat.replace(loggedInAs, "");
      const publicKeyA = (await getPublicKey(loggedInAs)) as string;
      const publicKeyB = (await getPublicKey(chatPartner)) as string;
      const participantArray: IParticipant[] = [
        {
          username: loggedInAs,
          publicKey: publicKeyA
        },
        {
          username: chatPartner,
          publicKey: publicKeyB
        }
      ];
      await createChatroom(participantArray);

      const response = await fetch("https://chatapp.deta.dev/chatroom/getMessages", {
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

        if (responseJson.messages) {
          setMessages(responseJson.messages);
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
      magic();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // THIS IS EVIL
  const magic = async () => {
    if (currentChat) await fetchMessages();
  };

  const getPublicKey = async (username: string) => {
    const response: Response = await fetch("http://localhost:3001/keys/getPublic/" + username, {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      }
    });

    try {
      const responseJson = await response.json();
      return responseJson.publicKey as string;
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
    }
  };

  const createChatroom = async (participantArray: IParticipant[]) => {
    try {
      const welcomeMessage: IEncryptedMessage[] = [
        {
          msg: "Welcome to your brand new chatroom!",
          author: "System",
          dateTime: Date.now()
        }
      ];

      await fetch("http://localhost:3001/chatroom/create", {
        method: "POST",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          participants: participantArray,
          messages: welcomeMessage
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

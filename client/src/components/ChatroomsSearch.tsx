import React, { ChangeEvent, useEffect, useState } from "react";
import UserListItem from "./UserListItem";

function ChatroomsSearch() {
  const authToken = sessionStorage.getItem("chatapp_token") as string;
  const [usernames, setUsernames] = useState<string[]>([". . ."]);
  const [fullArray, setFullArray] = useState<string[]>([]);

  const getUsers = async () => {
    const response: Response = await fetch("https://chatapp.deta.dev/users/getall", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken
      }
    });

    try {
      const responseJson: string[] = await response.json();
      setFullArray(responseJson);
      setUsernames(responseJson);
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const content: string = (document.getElementById("searchbox") as HTMLInputElement).value;

    if (content === "" || content === "*") {
      getUsers();
      return;
    }

    const resultArray: string[] = [];
    fullArray.forEach((username) => {
      if (username.toLowerCase().includes(content.toLowerCase())) {
        resultArray.push(username);
      }
      return;
    });

    console.warn(resultArray);

    if (resultArray.length >= 1) {
      setUsernames(resultArray);
    } else {
      setUsernames(["No such user found."]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const usersList: JSX.Element[] = usernames.map((uname) => {
    return (
      <li key={uname} className="w-full">
        <UserListItem username={uname} />
      </li>
    );
  });

  return (
    <div className="flex flex-col min-h-full w-1/6 items-center py-5 overflow-y-scroll max-h-screen">
      <input
        onChange={changeHandler}
        type="text"
        name="searchbox"
        id="searchbox"
        placeholder="Search for Username"
        className="outline-none border-2 border-black rounded-md px-2.5 focus:scale-105 transition-all"
      />
      <ul className="flex flex-col w-full space-y-3 px-5 mt-5">{usersList}</ul>
    </div>
  );
}

export default ChatroomsSearch;

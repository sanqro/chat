import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";

function ChatroomsSearch() {
  const authToken = sessionStorage.getItem("chatapp_token");
  const [usernames, setUsernames] = useState<string[]>([". . ."]);

  const getUsers = async () => {
    const response: Response = await fetch("https://chatapp.deta.dev/users/getall", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authToken
      }
    });

    try {
      const responseJson: string[] = await response.json();
      setUsernames(responseJson);
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occurred");
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

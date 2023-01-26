import React, { MouseEvent } from "react";
import { ISearchResult } from "../interfaces/props";

function OpenChatroomButton(props: ISearchResult) {
  if (props.username === ". . ." || props.username === "No such user found.") {
    return <></>;
  }

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sessionStorage.setItem("current_chat", chatroomKey());
  };

  const chatroomKey = () => {
    try {
      const loggedInAs = sessionStorage.getItem("logged_in_as");
      const unameArray = [loggedInAs, props.username].sort();

      let key = "";
      for (const uname of unameArray) {
        key += uname;
      }

      return key;
    } catch (error) {
      error instanceof Error
        ? console.error(error.message)
        : console.error("Unknown error occured!");
      return "chatroom_key_error";
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="px-2 py-1 bg-blue-600 text-sm rounded-md text-white h-fit"
    >
      OPEN
    </button>
  );
}

export default OpenChatroomButton;

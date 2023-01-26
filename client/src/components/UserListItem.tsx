import React from "react";
import { ISearchResult } from "../interfaces/props";
import OpenChatroomButton from "./OpenChatroomButton";

function UserListItem(props: ISearchResult) {
  let username = props.username;
  const maxLength = 10;

  if (username.length > maxLength && username !== "No such user found.") {
    username = username.substring(0, maxLength - 2) + "...";
  }

  return (
    <div
      className="flex flex-row justify-between border-2 border-black px-5 py-2.5 items-center
                  hover:scale-105 hover:border-cyan-400 transition-all"
    >
      <p className="font-bold">{username}</p>
      <OpenChatroomButton username={props.username} />
    </div>
  );
}

export default UserListItem;

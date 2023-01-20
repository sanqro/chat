import React from "react";
import { ISearchResult } from "../interfaces/props";
import OpenChatroomButton from "./OpenChatroomButton";

function UserListItem(props: ISearchResult) {
  return (
    <div
      className="flex flex-row justify-between border-2 border-black px-5 py-2.5 items-center
                  hover:scale-105 hover:border-cyan-400 transition-all"
    >
      <p className="font-bold mr-7">{props.username}</p>
      <OpenChatroomButton username={props.username} />
    </div>
  );
}

export default UserListItem;

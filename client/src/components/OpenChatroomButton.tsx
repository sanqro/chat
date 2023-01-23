import React, { MouseEvent } from "react";
import { ISearchResult } from "../interfaces/props";

function OpenChatroomButton(props: ISearchResult) {
  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (props.username === ". . .") {
      return;
    }

    alert(props.username);
    // do something
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

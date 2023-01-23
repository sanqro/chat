import React, { MouseEvent } from "react";
import { ICopyBox } from "../interfaces/props";

function CopyBox(props: ICopyBox) {
  const copyText = (e: MouseEvent<HTMLButtonElement>) => {
    // This function was written with the help of the following source:
    // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

    e.preventDefault();
    const toCopy: string = props.children;
    navigator.clipboard.writeText(toCopy);
    alert("Copied the private key to your clipboard! Make sure to store it somewhere secure.");
  };

  return (
    <div className="flex flex-row justify-start items-center">
      <input
        id="toCopy"
        type="password"
        placeholder={props.placeholder}
        value={props.children}
        className="border-b border-black text-xl px-4 py-2 -mr-12"
        disabled
      />
      <button
        onClick={copyText}
        className="w-fit h-fit bg-white border border-dotted border-black rounded-md
        hover:bg-gray-200 py-0.5 px-1"
      >
        Copy
      </button>
    </div>
  );
}

export default CopyBox;

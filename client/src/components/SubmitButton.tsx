import React from "react";
import { ISubmitButton } from "../interfaces/props";

function SubmitButton(props: ISubmitButton) {
  return (
    <div>
      <input
        type="submit"
        value={props.children}
        className="px-4 py-2 bg-black text-2xl rounded-md text-white
        hover:bg-gray-600 transition-all delay-200"
      />
    </div>
  );
}

export default SubmitButton;

import React from "react";
import { Link } from "react-router-dom";
import { IBigButton } from "../interfaces/interfaces";

function BigButton(props: IBigButton) {
  return (
    <Link to={props.destination}>
      <button className="px-4 py-2 bg-blue-600 text-2xl rounded-md text-white">
        {props.children}
      </button>
    </Link>
  );
}

export default BigButton;

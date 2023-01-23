import React from "react";
import { IInputField } from "../interfaces/props";

function FormInputField(props: IInputField) {
  const spacelessId = props.placeholder.replaceAll(" ", "").toLowerCase();

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      id={spacelessId}
      className="border-b border-black text-xl px-4 py-2"
    />
  );
}

export default FormInputField;

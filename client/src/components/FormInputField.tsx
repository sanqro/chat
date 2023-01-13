import React from "react";
import { IInputField } from "../interfaces/props";

function FormInputField(props: IInputField) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className="border-b border-black text-xl px-4 py-2"
    />
  );
}

export default FormInputField;

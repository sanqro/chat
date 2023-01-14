import React, { FormEvent } from "react";
import CopyBox from "./CopyBox";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function RegistrationField() {
  let username: string;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    username = (document.getElementById("username") as HTMLInputElement).value;
    if (!verifyInput()) return;
    alert("submit function gets called!");
    // submit
  };

  const verifyInput = () => {
    try {
      if (username.length < 1) throw new Error("Please enter a valid username.");
      return true;
    } catch (error) {
      error instanceof Error ? alert(error.message) : alert("Unknown error!");
      return false;
    }
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-6 items-center">
      <h1>Registration</h1>
      <form className="flex flex-col space-y-5 items-center" onSubmit={submitHandler}>
        <label htmlFor="username">
          <FormInputField type="text" placeholder="Username" />
        </label>
        <label htmlFor="privateKey">
          <CopyBox placeholder="New Private Key">
            Text to Copy!Text to Copy!Text to Copy!Text to Copy!Text to Copy!Text to Copy!Text to
            Copy!Text to Copy!Text to Copy!Text to Copy!Text to Copy!Text to Copy!Text to Copy!
          </CopyBox>
        </label>
        <SubmitButton>Generate Keys</SubmitButton>
      </form>
    </div>
  );
}

export default RegistrationField;

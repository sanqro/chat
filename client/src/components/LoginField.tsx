import React, { FormEvent } from "react";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function LoginField() {
  let username: string;
  let privateKey: string;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    username = (document.getElementById("username") as HTMLInputElement).value;
    privateKey = (document.getElementById("privatekey") as HTMLInputElement).value;
    if (!verifyInput()) return;
    alert("submit function gets called!");
    // submit

    // save token in sessionstorage
    sessionStorage.setItem("chatapp_token", "sampleToken1234");
  };

  const verifyInput = () => {
    try {
      if (username.length < 1) throw new Error("Please enter a valid username.");
      if (privateKey.length < 50) throw new Error("Please enter a valid private key.");
      return true;
    } catch (error) {
      error instanceof Error ? alert(error.message) : alert("Unknown error!");
      return false;
    }
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-6 items-center">
      <h1>Login</h1>
      <form className="flex flex-col space-y-5 items-center" onSubmit={submitHandler}>
        <label htmlFor="username">
          <FormInputField type="text" placeholder="Username" />
        </label>
        <label htmlFor="privateKey">
          <FormInputField type="password" placeholder="Private Key" />
        </label>
        <SubmitButton>Login</SubmitButton>
      </form>
    </div>
  );
}

export default LoginField;

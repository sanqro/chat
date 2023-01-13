import React, { FormEvent } from "react";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function LoginField() {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submit function gets called!");
    // submit
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

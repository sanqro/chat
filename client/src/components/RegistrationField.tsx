import React, { FormEvent } from "react";
import CopyBox from "./CopyBox";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function RegistrationField() {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submit function gets called!");
    // submit
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

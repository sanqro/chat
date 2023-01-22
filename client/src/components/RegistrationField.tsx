/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { FormEvent, useState } from "react";
import CopyBox from "./CopyBox";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function RegistrationField() {
  let username: string;
  let [privateKey, setPrivateKey] = useState("");
  let [publicKey, setPublicKey] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    username = (document.getElementById("username") as HTMLInputElement).value;
    if (!verifyInput()) return;
    await getKeys();
    console.log("ho");
    register();
  };

  const getKeys = async () => {
    const response = await fetch("https://chatapp.deta.dev/keys/generateKeypair", {
      method: "GET"
    });
    const responseJson = await response.json();
    setPrivateKey((privateKey = responseJson.privateKey));
    setPublicKey((publicKey = responseJson.publicKey));
  };

  const register = async () => {
    console.log(publicKey);
    const registerResponse = await fetch("https://chatapp.deta.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        privateKey,
        publicKey
      })
    });
    const registerJson = await registerResponse.json();
    console.log(username, privateKey, publicKey);
    console.log(privateKey, publicKey);
    if (registerJson.success) {
      alert("Registration Successful!");
    } else {
      alert("Registration Failed: " + registerJson.error);
    }
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
          <CopyBox placeholder="New Private Key">{privateKey}</CopyBox>
        </label>
        <SubmitButton>Generate Keys</SubmitButton>
      </form>
    </div>
  );
}

export default RegistrationField;

import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";

function LoginField() {
  const navigate = useNavigate();

  let username: string;
  let privateKey: string;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    username = (document.getElementById("username") as HTMLInputElement).value;
    privateKey = (document.getElementById("privatekey") as HTMLInputElement).value;
    if (!verifyInput()) return;
    await login();
  };

  const login = async () => {
    const loginResponse = await fetch("https:///chatapp.deta.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        privateKey
      })
    });
    const loginJson = await loginResponse.json();
    if (loginJson.success) {
      sessionStorage.setItem("chatapp_token", loginJson.token);
      sessionStorage.setItem("logged_in_as", username);
      sessionStorage.setItem("constant_requests", "true");
      sessionStorage.setItem("first_fetch", "true");
      navigate("/chat");
    } else {
      alert("Login Failed: " + loginJson.error);
    }
  };

  const verifyInput = () => {
    try {
      if (username.length < 1) throw new Error("Please enter a valid username.");
      if (privateKey.length < 1) throw new Error("Please enter a valid private key.");
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

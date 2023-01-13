import React from "react";
import BigButton from "../components/BigButton";

function Landingpage() {
  return (
    <main>
      <p className="text-4xl font-bold mb-5">Private Chatting App</p>
      <div className="flex flex-row space-x-7">
        <BigButton destination="/login">Login</BigButton>
        <BigButton destination="/register">Register</BigButton>
      </div>
    </main>
  );
}

export default Landingpage;

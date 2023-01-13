import React from "react";
import BigButton from "../components/BigButton";

function NotFound() {
  return (
    <main>
      <p className="text-4xl mb-5">404: Page Not Found</p>
      <BigButton destination="/">Return to Landingpage</BigButton>
    </main>
  );
}

export default NotFound;

import React, { useState, useEffect } from "react";

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState(sessionStorage.getItem("constantRequests") === "true");

  useEffect(() => {
    sessionStorage.setItem("constantRequests", isToggled ? "false" : "true");
  }, [isToggled]);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button
      className={`h-fit w-fit ml-5 mt-5 px-4 py-2 text-xl rounded-md text-white" ${
        isToggled ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
      }`}
      onClick={handleClick}
    >
      Constant Requests {isToggled ? "On" : "Off"}
    </button>
  );
};

export default ToggleButton;

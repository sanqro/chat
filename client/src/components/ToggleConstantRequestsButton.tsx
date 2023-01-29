import React, { useState, useEffect, MouseEvent } from "react";

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(true);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    sessionStorage.setItem("constant_requests", isToggled.toString());
  }, [isToggled]);

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

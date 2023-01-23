import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-full">
      <Outlet />
    </div>
  );
}

export default Layout;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const authToken = sessionStorage.getItem("chatapp_token");
  return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

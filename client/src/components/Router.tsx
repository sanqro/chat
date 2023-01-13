import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "../pages/Landingpage";
import Layout from "./Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

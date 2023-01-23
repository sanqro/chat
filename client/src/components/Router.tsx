import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "../pages/Landingpage";
import Layout from "./Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ChattingWindow from "../pages/ChattingWindow";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="chat">
              <Route index element={<ChattingWindow />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

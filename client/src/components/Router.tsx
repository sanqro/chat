import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "../pages/Landingpage";
import Layout from "./Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landingpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

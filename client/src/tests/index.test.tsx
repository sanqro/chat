import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../pages/App";

test("renders App", () => {
  render(<App />);
  const text = screen.getByText(/Hello World!/i);
  expect(text).toBeInTheDocument();
});

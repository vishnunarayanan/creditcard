import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders credit card component", () => {
  render(<App />);
  const textElement = screen.getAllByText(
    /Enter your credit card information/i
  );
  expect(textElement[0]).toBeInTheDocument();
});

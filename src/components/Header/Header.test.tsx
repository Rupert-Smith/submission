import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { Header } from "./Header";

describe("Header component", () => {
  test("should render the support and settings icons", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const supportIcon = screen.getByTestId("support-icon");
    const settingsIcon = screen.getByTestId("settings-icon");

    expect(supportIcon).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

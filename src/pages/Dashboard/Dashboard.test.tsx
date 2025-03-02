import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockInvestment } from "../../test-utils/investment";
import { useGetInvestments } from "../../hooks/useGetInvestments/useGetInvestments";
import { BrowserRouter } from "react-router-dom";

import { Dashboard } from "./Dashboard";

jest.mock("../../hooks/useGetInvestments/useGetInvestments");

const renderComponent = () => {
  jest.clearAllMocks();
  (useGetInvestments as jest.Mock).mockReturnValue({
    investments: [mockInvestment],
    loading: false,
    error: null,
  });
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe("Dashboard page", () => {
  test("should render heading correctly", () => {
    renderComponent();

    const heading = screen.getByRole("heading", {
      level: 5,
      name: /total investments/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test("should render the correct amount of investments", () => {
    renderComponent();

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /£5000/i,
    });

    expect(heading).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

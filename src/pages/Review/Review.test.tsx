import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Review } from "./Review";
import { useGetInvestments } from "../../hooks/useGetInvestments/useGetInvestments";
import { useGetFunds } from "../../hooks/useGetFunds/useGetFunds";
import { mockInvestment } from "../../test-utils/investment";
import { mockFund } from "../../test-utils/fund";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../hooks/useGetInvestments/useGetInvestments");
jest.mock("../../hooks/useGetFunds/useGetFunds");

describe("Review page", () => {
  interface Config {
    investmentsLoading: boolean;
    fundsLoading: boolean;
    investmentError: boolean;
    fundsError: boolean;
  }

  const renderComponent = (config: Config) => {
    jest.clearAllMocks();
    (useGetInvestments as jest.Mock).mockReturnValue({
      investments: [mockInvestment],
      loading: config.investmentsLoading,
      error: config.investmentError,
    });

    (useGetFunds as jest.Mock).mockReturnValue({
      funds: [mockFund],
      loading: config.fundsLoading,
      error: config.fundsError,
    });

    render(
      <BrowserRouter>
        <Review />
      </BrowserRouter>
    );
  };

  test("should render the loading screen", () => {
    const config = {
      investmentsLoading: true,
      fundsLoading: true,
      investmentError: false,
      fundsError: false,
    };

    renderComponent(config);

    const loadingText = screen.getByText(
      "Bare with us while we fetch your account data..."
    );

    expect(loadingText).toBeInTheDocument();
  });

  test("should display error when request fails", async () => {
    const config = {
      investmentsLoading: false,
      fundsLoading: false,
      investmentError: true,
      fundsError: true,
    };

    renderComponent(config);

    const errorText = await screen.findByText(
      "Something has gone wrong, please contact support"
    );

    expect(errorText).toBeInTheDocument();
  });

  test("renders page correctly with investments", async () => {
    const config = {
      investmentsLoading: false,
      fundsLoading: false,
      investmentError: false,
      fundsError: false,
    };

    renderComponent(config);

    expect(
      screen.getByText(
        "View the performance of your investments and track their growth over time."
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockFund.name)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

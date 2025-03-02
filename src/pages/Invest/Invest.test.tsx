import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Invest } from "./Invest";
import { useGetFunds } from "../../hooks/useGetFunds/useGetFunds";
import { useGetSourceById } from "../../hooks/useGetSourceById/useGetSourceById";
import { mockFund } from "../../test-utils/fund";
import { mockSource } from "../../test-utils/source";

jest.mock("../../hooks/useGetFunds/useGetFunds");
jest.mock("../../hooks/useGetSourceById/useGetSourceById");

describe("Invest page", () => {
  interface Config {
    loading: boolean;
    error: boolean;
  }

  const renderComponent = (config: Config) => {
    jest.clearAllMocks();
    (useGetFunds as jest.Mock).mockReturnValue({
      funds: [mockFund],
      loading: config.loading,
      error: config.error,
    });

    (useGetSourceById as jest.Mock).mockReturnValue({
      source: mockSource,
      loading: config.loading,
      error: config.error,
    });
    render(<Invest />);
  };

  test("should render the loading screen", () => {
    const config = {
      loading: true,
      error: false,
    };

    renderComponent(config);

    const loadingText = screen.getByText(
      "Bare with us while we fetch your account data..."
    );

    expect(loadingText).toBeInTheDocument();
  });

  test("should display error when request fails", async () => {
    const config = {
      loading: false,
      error: true,
    };

    renderComponent(config);

    const errorText = await screen.findByText(
      "Something has gone wrong, please contact support"
    );

    expect(errorText).toBeInTheDocument();
  });

  test("renders page correctly", async () => {
    const config = {
      loading: false,
      error: false,
    };

    renderComponent(config);

    expect(
      screen.getByText("Total available funds to invest")
    ).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Funds")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});

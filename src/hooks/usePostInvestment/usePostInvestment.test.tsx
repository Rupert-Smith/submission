import { renderHook, act, waitFor } from "@testing-library/react";
import { usePostInvestment } from "./usePostInvestment";
import { postInvestment } from "../../services/api";
import { PostInvestment } from "../../types/Investments";
import { mockPostInvestment } from "../../test-utils/investment";

jest.mock("../../services/api", () => ({
  postInvestment: jest.fn(),
}));

describe("usePostInvestment Hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should successfully submit an investment", async () => {
    (postInvestment as jest.Mock).mockResolvedValue({ status: 201 });

    const { result } = renderHook(() => usePostInvestment());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    await act(async () => {
      const response = await result.current.submitInvestment(
        mockPostInvestment as PostInvestment
      );
      expect(response).toBe("Success");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle an error when submission fails", async () => {
    (postInvestment as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => usePostInvestment());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.submitInvestment(
        mockPostInvestment as PostInvestment
      );
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error fetching source");
  });
});

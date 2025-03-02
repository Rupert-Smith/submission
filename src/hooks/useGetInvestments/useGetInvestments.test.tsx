import { renderHook, waitFor } from "@testing-library/react";
import { useGetInvestments } from "./useGetInvestments";
import { getInvestments } from "../../services/api";
import { mockInvestment } from "../../test-utils/investment";

jest.mock("../../services/api", () => ({
  getInvestments: jest.fn(),
}));

describe("useGetInvestments Hook", () => {
  it("should fetch investments successfully", async () => {
    (getInvestments as jest.Mock).mockResolvedValue([mockInvestment]);

    const { result } = renderHook(() => useGetInvestments());

    expect(result.current.loading).toBe(true);
    expect(result.current.investments).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.investments).toEqual([mockInvestment]);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when fetching investments fails", async () => {
    (getInvestments as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useGetInvestments());

    expect(result.current.loading).toBe(true);
    expect(result.current.investments).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.investments).toEqual([]);
    expect(result.current.error).toBe("Error fetching investments");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

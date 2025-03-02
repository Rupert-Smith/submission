import { renderHook, waitFor } from "@testing-library/react";
import { useGetFunds } from "./useGetFunds";
import { getFunds } from "../../services/api";
import { mockFund } from "../../test-utils/fund";

jest.mock("../../services/api", () => ({
  getFunds: jest.fn(),
}));

describe("useGetFunds Hook", () => {
  it("should fetch funds successfully", async () => {
    (getFunds as jest.Mock).mockResolvedValue([mockFund]);

    const { result } = renderHook(() => useGetFunds());

    expect(result.current.loading).toBe(true);
    expect(result.current.funds).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.funds).toEqual([mockFund]);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when fetching funds fails", async () => {
    (getFunds as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useGetFunds());

    expect(result.current.loading).toBe(true);
    expect(result.current.funds).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.funds).toEqual([]);
    expect(result.current.error).toBe("Error fetching funds");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

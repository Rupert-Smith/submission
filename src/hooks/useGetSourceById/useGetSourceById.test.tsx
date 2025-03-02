import { renderHook, waitFor } from "@testing-library/react";
import { useGetSourceById } from "./useGetSourceById";
import { getSourceById } from "../../services/api";
import { mockSource } from "../../test-utils/source";

jest.mock("../../services/api", () => ({
  getSourceById: jest.fn(),
}));

describe("useGetSourceById Hook", () => {
  it("should fetch source successfully", async () => {
    (getSourceById as jest.Mock).mockResolvedValue(mockSource);

    const { result } = renderHook(() => useGetSourceById("1"));

    expect(result.current.loading).toBe(true);
    expect(result.current.source).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.source).toEqual(mockSource);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when fetching source fails", async () => {
    (getSourceById as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useGetSourceById("1"));

    expect(result.current.loading).toBe(true);
    expect(result.current.source).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.source).toBeUndefined();
    expect(result.current.error).toBe("Error fetching source");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

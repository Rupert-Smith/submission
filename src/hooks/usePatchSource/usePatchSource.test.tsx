import { renderHook, waitFor } from "@testing-library/react";
import { usePatchSource } from "./usePatchSource";
import { patchSource } from "../../services/api";
import { mockPatchSource } from "../../test-utils/source";

jest.mock("../../services/api", () => ({
  patchSource: jest.fn(),
}));

describe("usePatchSource Hook", () => {
  it("should patch source successfully", async () => {
    (patchSource as jest.Mock).mockResolvedValue({ status: 200 });

    const { result } = renderHook(() => usePatchSource());

    const patchData = mockPatchSource;
    const patchResult = await result.current.patchSource("1", patchData);

    expect(result.current.loading).toBe(false);
    expect(patchResult).toBe("Success");
    expect(result.current.error).toBeNull();
  });

  it("should handle error when patching source fails", async () => {
    (patchSource as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => usePatchSource());

    const patchData = mockPatchSource;
    await result.current.patchSource("1", patchData);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error patching source");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

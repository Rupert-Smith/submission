import { useState } from "react";
import { patchSource as patchSourceApi } from "../../services/api";
import { PatchSource } from "@/types/Source";

export const usePatchSource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const patchSource = async (id: string, body: PatchSource) => {
    try {
      setLoading(true);
      const result = await patchSourceApi(id, body);
      console.log(result);
      if (result.status === 200) {
        return "Success";
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError("Error patching source");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patchSource };
};

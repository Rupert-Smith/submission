import { useState, useEffect } from "react";
import { getSourceById } from "../../services/api";
import { Source } from "../../types/Source";

export const useGetSourceById = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [source, setSource] = useState<Source>();
  const [error, setError] = useState<string | null>(null);

  const fetchSourcebyId = async (id: string) => {
    try {
      setLoading(true);
      const source = await getSourceById(id);
      setSource(source);
    } catch (error) {
      setError("Error fetching source");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSourcebyId(id);
  }, [id]);

  return { loading, source, error, fetchSourcebyId };
};

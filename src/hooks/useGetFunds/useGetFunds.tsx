import { useState, useEffect } from "react";
import { getFunds } from "../../services/api";
import { Fund } from "../../types/Fund";

export const useGetFunds = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFunds = async () => {
    try {
      setLoading(true);
      const funds = await getFunds();
      setFunds(funds);
    } catch (error) {
      setError("Error fetching funds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  return { loading, funds, error };
};

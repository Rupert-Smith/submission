import { useState, useEffect } from "react";
import { getInvestments } from "../../services/api";
import { Investment } from "../../types/Investments";

export const useGetInvestments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const investments = await getInvestments();
      setInvestments(investments);
    } catch (error) {
      setError("Error fetching investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return { loading, investments, error };
};

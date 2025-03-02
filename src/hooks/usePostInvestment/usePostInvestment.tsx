import { useState } from "react";
import { postInvestment } from "../../services/api";
import { PostInvestment } from "../../types/Investments";

export const usePostInvestment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitInvestment = async (investment: PostInvestment) => {
    try {
      setLoading(true);
      const result = await postInvestment(investment);
      if (result.status === 201) {
        return "Success";
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError("Error fetching source");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitInvestment };
};

import { Investment } from "../types/Investments";

export const mockInvestment: Investment = {
  id: "1",
  customerId: "123",
  fundId: "10",
  amount: 5000,
  investmentDate: new Date().toISOString(),
};

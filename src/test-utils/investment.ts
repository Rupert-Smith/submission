import { Investment, PostInvestment } from "../types/Investments";

export const mockInvestment: Investment = {
  id: "1",
  customerId: "123",
  fundId: "1",
  amount: 5000,
  investmentDate: new Date().toISOString(),
};

export const mockPostInvestment: PostInvestment = {
  customerId: "123",
  fundId: "1",
  amount: 5000,
  investmentDate: new Date().toISOString(),
};

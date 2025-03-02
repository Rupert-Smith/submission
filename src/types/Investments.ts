export type Investment = {
  id: string;
  customerId: string;
  fundId: string;
  amount: number;
  investmentDate: string;
};

export type PostInvestment = {
  customerId: string;
  fundId: string;
  amount: number;
  investmentDate: string;
};

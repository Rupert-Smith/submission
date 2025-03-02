type SourceTransaction = {
  id: string;
  amount: number;
  transactionDate: string;
};

export type Source = {
  id: string;
  customerId: string;
  sourceType: "ISA" | "GIA" | "SIPP";
  sourceBalance: number;
  sourceTransactions: SourceTransaction[];
  sourceName: string;
};

export type PatchSource = {
  customerId?: string;
  sourceType?: "ISA" | "GIA" | "SIPP";
  sourceBalance?: number;
  sourceTransactions?: SourceTransaction[];
  sourceName?: string;
};

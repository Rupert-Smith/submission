import { Source, PatchSource } from "../types/Source";

export const mockSource: Source = {
  id: "1",
  customerId: "12345",
  sourceType: "ISA",
  sourceBalance: 25000,
  sourceName: "My Investment Account",
  sourceTransactions: [],
};

export const mockPatchSource: PatchSource = {
  customerId: "12345",
  sourceType: "ISA",
  sourceBalance: 25000,
  sourceName: "My Investment Account",
  sourceTransactions: [],
};

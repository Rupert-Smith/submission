import { formatAmount } from "./formatAmount";

describe("format amount utility", () => {
  it("should format number to pounds correctly", () => {
    const amount = 28573.35;

    const formattedAmount = formatAmount(amount);

    expect(formattedAmount).toEqual("£28,573.35");
  });
});

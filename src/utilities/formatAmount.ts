export const formatAmount = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);

  return formattedAmount;
};

export const USDDAddress = "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn";
export const USDTAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
export const USDCAddress = "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8";

export const StableCoinType = {
  USDD: { type: "USDD", value: 1, label: "USDD", icon: "usdd.png" },
  USDT: { type: "USDT", value: 2, label: "USDT", icon: "usdt.png" },
  USDC: { type: "USDC", value: 3, label: "USDC", icon: "usdc.png" },
};

export const getStableCoinValues = () => {
  return Object.values(StableCoinType);
};

export const getStableCoin = (stableCoinType) => {
  return StableCoinType[stableCoinType];
};

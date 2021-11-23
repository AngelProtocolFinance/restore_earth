const STEPS = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const STEP_TITLES = (step: number) => {
  switch (step) {
    case STEPS.CONNECT:
      return "Connect";
    case STEPS.DONATE:
      return "Donate";
    case STEPS.THANKYOU:
      return "Thank You";
    default:
      return "[UNKNOWN]";
  }
};

export { STEPS, STEP_TITLES };

// const TOKENS = {
//   BITCOIN: "BTC",
//   ETHEREUM: "ETH",
//   TERRA: "UST",
// };

// const SUGGESTED_DONATION_AMOUNTS = {
//   BITCOIN: ["0.0017", "0.0087", "0.017", "0.087", "0.44", "0.87", "1.74"],
//   ETHEREUM: ["0.024", "0.12", "0.24", "1.2", "6", "12", "24"],
//   TERRA: ["100", "500", "1000", "5000", "25000", "50000", "100000"],
// };

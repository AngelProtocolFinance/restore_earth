const STEPS = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const TRANSACTION_STEPS = {
  FORM: 1,
  SENDING_TRANSACTION: 2,
  SENDING_KYC: 3,
  ERROR_TRANSACTION: 4,
  ERROR_KYC: 5,
  SUCCESS: 6,
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

export { STEPS, STEP_TITLES, TRANSACTION_STEPS };

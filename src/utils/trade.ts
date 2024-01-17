import { TState } from "../contexts/trade";

type TExchange = ({
  from,
  to,
  amount,
  wallet,
}: Omit<TState, "currencies"> & {
  amountFree: number;
  baseFrom: number;
  baseTo: number;
}) => {
  status: string;
  data?: Partial<TState> & {
    changes: {
      lessTo: number;
      moreFrom: number;
    };
  };
  error: string;
};

/**
 * Default value for floating number's precision
 * Mostly used for the exchange rate
 */
const PRECISION = 5;
const precisionMultiplier = (precision = PRECISION) => Math.pow(10, precision);

/**
 * This function rounds a floating number
 * trying to overcome JS's number representation
 * for cases like 3.3 / 10 = 0.32999999999999996
 */
export const roundToPrecision = (num: number, precision = PRECISION) => {
  const precisionMultiplied = precisionMultiplier(precision);

  return Math.round(num * precisionMultiplied) / precisionMultiplied;
};

// To convert CURRENCY 1 (C1) to a certain amount of CURRENCY 2 (C2)
// multiply the desired amount to the division of the rate of C1 to the
// rate of C2
// C1 (a) = C2 (a) * C1 (rate) / C2 (rate)
export const exchange: TExchange = ({
  from,
  to,
  amount,
  amountFree,
  baseFrom,
  baseTo,
  wallet,
}) => {
  const amountInWallet = wallet[from];
  const amountNumber = Number(amount);

  if (!(amountNumber && amountNumber > 0)) {
    return {
      status: "failed",
      error: "There is a problem with the amount format or one is 0.",
    };
  }

  // Calculate rate and amount needed for the transaction
  const rate = roundToPrecision(baseFrom / baseTo);
  const amountToGive = roundToPrecision(amountNumber * rate, 2);

  // Check if there is enough money of the currency in the bank
  if (amountFree < amount) {
    console.error("There are not enought free currency units to buy.");

    return {
      status: "failed",
      error: "There are not enought free currency units to buy.",
    };
  }

  // Check if the user has enough money for the transaction
  if (amountToGive > amountInWallet) {
    console.error("There are not enough currency units in your wallet.");

    return {
      status: "failed",
      error: "There are not enough currency units in your wallet.",
    };
  }

  // Update the wallet
  const updatedWallet = {
    ...wallet,
    [from]: roundToPrecision(amountInWallet - amountToGive, 2),
    [to]: roundToPrecision(wallet[to] + amount, 2),
  };

  // Return the changes for the bank as well
  return {
    status: "success",
    data: {
      from,
      to,
      amount,
      wallet: updatedWallet,
      changes: {
        lessTo: amount,
        moreFrom: amountToGive,
      },
    },
    error: "",
  };
};

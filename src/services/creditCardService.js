export const UNKNOWN_CARD_TYPE = "unknown";
const CREDIT_CARDS = {
  visa: {
    totalLength: 16,
    formattedTotalLength: 19, // derived property
    pattern: [4, 4, 4, 4],
    startsWith: ["4"],
    cvv2Length: 3,
  },
  mastercard: {
    totalLength: 16,
    formattedTotalLength: 19, // derived property
    pattern: [4, 4, 4, 4],
    startsWith: ["5"],
    cvv2Length: 3,
  },
  amex: {
    totalLength: 15,
    formattedTotalLength: 17, // derived property
    pattern: [4, 6, 5],
    startsWith: ["34", "37"],
    cvv2Length: 4,
  },
  unknown: {
    totalLength: 16,
    formattedTotalLength: 19, // derived property
    pattern: [4, 4, 4, 4],
    startsWith: [],
    cvv2Length: 3,
  },
};

export function formatCardNumber(cardNumber, cardType) {
  const { pattern } = CREDIT_CARDS[cardType];
  let regex = pattern.map((p) => `(\\d{0,${p}})`).join("");
  regex = new RegExp("^" + regex + "$", "g");
  const onlyNumbers = cardNumber.replace(/[^\d]/g, "");

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  );
}

export function isCardNumberValid(cardNumber, startsWith) {
  for (const startingNumber of startsWith) {
    if (cardNumber.startsWith(startingNumber)) {
      return true;
    }
  }
  return false;
}

export function getCardType(cardNumber) {
  const cardTypes = Object.keys(CREDIT_CARDS);
  for (const card of cardTypes) {
    const { startsWith } = CREDIT_CARDS[card];
    if (isCardNumberValid(cardNumber, startsWith)) {
      return card;
    }
  }
  return "unknown";
}

/**
 * remove alphabets from keystrokes
 * @param val
 */
export function removeAlphabets(val) {
  return val.replace(/[^\d]/g, "");
}

function removeSpaces(str) {
  return str.replace(/\s/g, "");
}

export function getCreditCardMetaData(cardType) {
  return CREDIT_CARDS[cardType || "unknown"];
}

export function formatMonth(month) {
  const monthAsNumber = parseInt(month);
  if (monthAsNumber >= 2 && monthAsNumber <= 9) month = `0${monthAsNumber}`;
  else if (monthAsNumber >= 13) month = "01";
  return month;
}

/** Validity methods **/
export function isCreditCardDateValid(month, year) {
  const currentMonth = (new Date().getMonth() + 1).toString();
  const currentYear = new Date().getFullYear().toString();

  if (year.localeCompare(currentYear) > 0) return true;

  if (
    year.localeCompare(currentYear) === 0 &&
    month.localeCompare(currentMonth) >= 0
  )
    return true;

  return false;
}

export function isCreditCardNumberLengthValid(cardType, number) {
  const { totalLength } = CREDIT_CARDS[cardType];
  return removeSpaces(number).length === totalLength;
}

export function isCvvValid(cardType, cvv) {
  const { cvv2Length } = CREDIT_CARDS[cardType];
  return cvv.length === cvv2Length;
}

export function validateCreditCard(cardNumber, month, year, cvv) {
  const cardType = getCardType(cardNumber);
  return (
    isCreditCardNumberLengthValid(cardType, cardNumber) &&
    isCreditCardDateValid(month, year) &&
    isCvvValid(cardType, cvv)
  );
}

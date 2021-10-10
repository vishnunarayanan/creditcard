import {
  formatCardNumber,
  formatMonth,
  getCardType,
  isCardNumberValid,
  isCreditCardDateValid,
  isCreditCardNumberLengthValid,
  isCvvValid,
  validateCreditCard,
  removeAlphabets,
} from "./creditCardService";

const AMEX_CC_NUMBER = "378842196466758";
const VISA_CC_NUMBER = "4556310970316918";
describe("credit card service", () => {
  it("formats credit card number", () => {
    expect(formatCardNumber(AMEX_CC_NUMBER, "amex")).toEqual(
      "3788 421964 66758"
    );
    expect(formatCardNumber(VISA_CC_NUMBER, "visa")).toEqual(
      "4556 3109 7031 6918"
    );
  });

  it("returns correct card type", () => {
    expect(getCardType(AMEX_CC_NUMBER)).toEqual("amex");
    expect(getCardType(VISA_CC_NUMBER)).toEqual("visa");
  });

  it("validates card number based on starting string", () => {
    expect(isCardNumberValid(AMEX_CC_NUMBER, ["37"])).toBeTruthy();
    expect(isCardNumberValid(VISA_CC_NUMBER, ["4"])).toBeTruthy();
  });

  it("returns formatted month", () => {
    expect(formatMonth("8")).toEqual("08");
    expect(formatMonth("13")).toEqual("01");
  });

  it("validates credit card date", () => {
    expect(isCreditCardDateValid("8", "2030")).toBeTruthy();
    expect(isCreditCardDateValid("8", "2010")).toBeFalsy();
    expect(isCreditCardDateValid("10", "2021")).toBeTruthy();
  });

  it("validates credit card number length", () => {
    expect(isCreditCardNumberLengthValid("amex", AMEX_CC_NUMBER)).toBeTruthy();
    expect(isCreditCardNumberLengthValid("visa", "123")).toBeFalsy();
  });

  it("validates credit cvv length", () => {
    expect(isCvvValid("amex", "1234")).toBeTruthy();
    expect(isCvvValid("amex", "123")).toBeFalsy();
  });

  it("removes alphabets", () => {
    expect(removeAlphabets("test1234", "1234")).toEqual("1234");
  });

  it("validates credit card", () => {
    expect(
      validateCreditCard(AMEX_CC_NUMBER, "10", "2030", "1234")
    ).toBeTruthy();
    expect(
      validateCreditCard(VISA_CC_NUMBER, "10", "2030", "1234")
    ).toBeFalsy();
  });
});

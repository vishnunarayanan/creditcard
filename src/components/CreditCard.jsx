import React, { useState } from "react";
import "./CreditCard.css";

import {
  formatCardNumber,
  formatMonth,
  getCardType,
  getCreditCardMetaData,
  isCreditCardDateValid,
  isCreditCardNumberLengthValid,
  isCvvValid,
  removeAlphabets,
  UNKNOWN_CARD_TYPE,
  validateCreditCard,
} from "../services/creditCardService";
import CardLogo, { AllCardLogo } from "./CardLogo";

const initialState = {
  name: "",
  cardNumber: "", // formatted card number
  cardType: UNKNOWN_CARD_TYPE, // visa or amex
  month: "", // 1 - 12
  year: "", // yyyy
  cvv: "",
};

/**
 * Component renders credit card.
 * cardsAllowed defines the card type the component accepts
 */
export default function CreditCard({ cardsAllowed = ["visa", "amex"] }) {
  // component state
  const [cardData, setCardData] = useState({ ...initialState, cardsAllowed });
  const cardMetaData = getCreditCardMetaData(cardData.cardType);

  function isCardTypeAllowed(cardType) {
    const { cardsAllowed } = cardData;
    return cardsAllowed.includes(cardType);
  }

  function handleNameChange(name) {
    setCardData({
      ...cardData,
      name,
    });
  }

  function handleCreditCardNumberChange(cardNumber) {
    cardNumber = removeAlphabets(cardNumber);
    if (!cardNumber) {
      // happens when user enters and deletes the number
      setCardData({ ...cardData, cardNumber });
      return;
    }
    // visa or amex
    let cardType = getCardType(cardNumber);
    if (!isCardTypeAllowed(cardType)) {
      cardType = UNKNOWN_CARD_TYPE;
    }
    const formattedCardNumber = formatCardNumber(cardNumber, cardType);
    setCardData({
      ...cardData,
      cardNumber: formattedCardNumber,
      cardType,
    });
  }

  function handleMonthChangeBlur(month) {
    month = month === "1" ? "01" : month;
    handleMonthChange(month);
  }

  function handleMonthChange(month) {
    month = removeAlphabets(month);
    month = formatMonth(month);
    if (month === "00") return;
    setCardData({
      ...cardData,
      month,
    });
  }

  function handleYearChange(year) {
    year = removeAlphabets(year);
    setCardData({
      ...cardData,
      year,
    });
  }

  function handleCVVChange(cvv) {
    cvv = removeAlphabets(cvv);
    setCardData({
      ...cardData,
      cvv,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { cardNumber, cvv, month, year, cardType } = cardData;
    if (!isCardTypeAllowed(cardType)) {
      alert("Card not supported");
      return;
    }
    if (validateCreditCard(cardNumber, month, year, cvv)) {
      alert("Validation Pass");
    } else {
      alert("Validation Fail");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container flex flex-col">
        <h3>Enter your credit card information</h3>

        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => handleNameChange(e.target.value)}
          minLength="4"
          maxLength="30"
          placeholder="Name"
          className="mt-1 mb-1"
        />

        {/* Credit Card number and card type (Amex, Visa) */}
        <div className="flex flex-col relative mb-1">
          <div className="flex flex-row">
            <input
              type="text"
              id="ccNumber"
              name="ccNumber"
              required
              className="flex-1"
              minLength={cardMetaData.formattedTotalLength}
              maxLength={cardMetaData.formattedTotalLength}
              placeholder="Card Number"
              value={cardData.cardNumber}
              onChange={(e) => handleCreditCardNumberChange(e.target.value)}
            />
          </div>
          <div className="absolute top-1 right-1">
            {cardData.cardNumber && cardData.cardType && (
              <CardLogo cardType={cardData.cardType}></CardLogo>
            )}
            {!cardData.cardNumber && (
              <AllCardLogo cardsAllowed={cardsAllowed} />
            )}
          </div>
          {/* Error msg */}
          <div className="text-red Text-fontSize--13">
            {cardData.cardNumber &&
              cardData.cardType !== UNKNOWN_CARD_TYPE &&
              !isCreditCardNumberLengthValid(
                cardData.cardType,
                cardData.cardNumber
              ) &&
              "Your card number is incomplete"}
            {cardData.cardNumber &&
              cardData.cardType === UNKNOWN_CARD_TYPE &&
              "Card not supported"}
          </div>
        </div>

        {/* Month and Year */}
        <div>
          <div className="flex flex-row justify-between">
            {/* Month */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div>
                  <input
                    className="flex-1"
                    type="text"
                    id="month"
                    name="month"
                    required
                    minLength="1"
                    maxLength="2"
                    onBlur={(e) => handleMonthChangeBlur(e.target.value)}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    value={cardData.month}
                    placeholder="Exp. Month (MM)"
                  />
                </div>
                {/* Year */}
                <div>
                  <input
                    className="flex-1"
                    type="text"
                    id="year"
                    name="year"
                    required
                    minLength="4"
                    maxLength="4"
                    onChange={(e) => handleYearChange(e.target.value)}
                    value={cardData.year}
                    placeholder="Exp. Year (YYYY)"
                  />
                </div>
              </div>
              {/* Month and Year Error Msg */}
              <div className="text-red Text-fontSize--13">
                {cardData.year &&
                  cardData.month &&
                  !isCreditCardDateValid(cardData.month, cardData.year) &&
                  "Your card's expiration date is in the past"}
              </div>
            </div>
            {/* Cvv */}
            <div>
              <input
                type="text"
                id="cvv2"
                name="cvv2"
                required
                minLength={cardMetaData.cvv2Length}
                maxLength={cardMetaData.cvv2Length}
                onChange={(e) => handleCVVChange(e.target.value)}
                value={cardData.cvv}
                placeholder="CVV2"
              />
              <div className="text-red Text-fontSize--13">
                {cardData.cvv &&
                  !isCvvValid(cardData.cardType, cardData.cvv) &&
                  `CVV length should be ${cardMetaData.cvv2Length}`}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary w-full justify-center mt-1"
          >
            Pay $25.00
          </button>
        </div>
      </div>
    </form>
  );
}

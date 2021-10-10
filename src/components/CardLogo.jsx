import React from "react";
import amex from "../amex.svg";
import visa from "../visa.svg";
import mc from "../mc.svg";
import creditcard from "../creditcard.svg";

/**
 * Component returns logo of card type
 */
export default function CardLogo({ cardType }) {
  let logo;
  switch (cardType) {
    case "amex":
      logo = amex;
      break;
    case "visa":
      logo = visa;
      break;
    case "mastercard":
      logo = mc;
      break;
    default:
      logo = creditcard;
  }

  return (
    <>
      <img src={logo} alt="logo" />
    </>
  );
}

/**
 * Component returns all logo
 */
export function AllCardLogo({ cardsAllowed }) {
  const map = {
    amex: amex,
    mastercard: mc,
    visa: visa,
    unknown: creditcard,
  };
  return (
    <>
      {cardsAllowed.map((card) => (
        <img key={card} src={map[card]} className="mr-s" alt="logo" />
      ))}
    </>
  );
}

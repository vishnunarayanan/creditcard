import "./App.css";
import CreditCard from "./components/CreditCard";

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* Supports visa, amex and master card */}
      <CreditCard cardsAllowed={["visa", "amex", "mastercard"]} />

      {/* Supports just visa */}
      <CreditCard cardsAllowed={["visa"]} />
    </div>
  );
}

export default App;

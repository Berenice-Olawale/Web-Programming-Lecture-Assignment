import { useState } from "react";
import CompButton from "./CompButton";
import "./calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  const CalculatorOperations = {
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!nextValue.includes(".")) {
      setNextValue(nextValue + ".");
    }
  };

  const percentage = () => {
    setNextValue(String(parseFloat(nextValue) / 100));
  };

  const changeSign = () => {
    setNextValue(String(parseFloat(nextValue) * -1));
  };

  const clearData = () => {
    setNextValue("0");
    setPrevValue(null);
    setOp(null);
  };

  const performOperation = () => {
    if (prevValue === null || op === null || nextValue === "") return;

    const result = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );

    setNextValue(String(result));
    setPrevValue(null);
    setOp(null);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(value);
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    } else if (value === "±") {
      changeSign();
    } else if (value === "C") {
      clearData();
    } else if (value === "=") {
      performOperation();
    } else if (value in CalculatorOperations) {
      if (prevValue === null) {
        setPrevValue(nextValue);
        setNextValue("0");
        setOp(value);
      } else if (nextValue !== "") {
        const result = CalculatorOperations[op](
          parseFloat(prevValue),
          parseFloat(nextValue)
        );
        setPrevValue(String(result));
        setNextValue("0");
        setOp(value);
      }
    }
  };

  return (
    
  <>
    <h2 className="section-title">Price Calculator (£)</h2>
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{nextValue}</div>
      </div>

      <div className="calculator-keypad">
        <div className="keys-function">
          <CompButton keyValue="C" onClick={handleOperation} />
          <CompButton keyValue="±" onClick={handleOperation} />
          <CompButton keyValue="%" onClick={handleOperation} />
        </div>

        <div className="keys-operators">
          <CompButton keyValue="+" onClick={handleOperation} />
          <CompButton keyValue="-" onClick={handleOperation} />
          <CompButton keyValue="*" onClick={handleOperation} />
          <CompButton keyValue="/" onClick={handleOperation} />
          <CompButton keyValue="=" onClick={handleOperation} />
        </div>

        <div className="keys-numbers">
          <CompButton keyValue={9} onClick={handleOperation} />
          <CompButton keyValue={8} onClick={handleOperation} />
          <CompButton keyValue={7} onClick={handleOperation} />
          <CompButton keyValue={6} onClick={handleOperation} />
          <CompButton keyValue={5} onClick={handleOperation} />
          <CompButton keyValue={4} onClick={handleOperation} />
          <CompButton keyValue={3} onClick={handleOperation} />
          <CompButton keyValue={2} onClick={handleOperation} />
          <CompButton keyValue={1} onClick={handleOperation} />
          <CompButton keyValue="." onClick={handleOperation} />
          <CompButton keyValue={0} onClick={handleOperation} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Calculator;
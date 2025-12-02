"use client"
import { useState, useRef } from "react";
import Button from "./button";
import Display from "./display";
import HistoryPanel from "./history-panel";
import ForceNumberModal from "./forced-number-modal";


const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showForcedModal, setShowForcedModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [forcedNumber, setForcedNumber] = useState(null);
  const longPressTimerRef = useRef(null);

  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op) => {
    const currentValue = Number.parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation && !waitingForNewValue) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = Number.parseFloat(display);
      const actualResult = performCalculation(previousValue, currentValue, operation);
      let forcedResult = null;
      let isForced = false;
      
      if (operation === '+' || operation === '-') {
        if (forcedNumber?.secondForceTriggerNumber !== null && 
            (currentValue === forcedNumber.secondForceTriggerNumber || 
             previousValue === forcedNumber.secondForceTriggerNumber)) {
          forcedResult = forcedNumber.secondForceNumber;
          isForced = true;
        }
        else if (forcedNumber?.forcedNumber !== null) {
          forcedResult = forcedNumber.forcedNumber;
          isForced = true;
        }
      }
      
      const finalResult = isForced ? forcedResult : actualResult;
      const timestamp = new Date().toLocaleString();
      
      setHistory([{
        expression: `${previousValue} ${operation} ${display}`,
        result: finalResult,
        actualResult: actualResult,
        forcedResult: forcedResult,
        timestamp,
        forced: isForced,
        operationType: operation
      }, ...history]);
      
      setDisplay(String(finalResult));
    }

    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case "+": return prev + current;
      case "-": return prev - current;
      case "×": return prev * current;
      case "÷": return prev / current;
      case "%": return prev % current;
      default: return current;
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleToggleSign = () => {
    const currentValue = Number.parseFloat(display);
    setDisplay(String(currentValue * -1));
  };

  const handlePercent = () => {
    const currentValue = Number.parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleAdditionStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowForcedModal(true);
    }, 600);
  };

  const handleAdditionEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleDivisionStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowForcedModal(true);
    }, 600);
  };

  const handleDivisionEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleMultiplyStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowHistory(true);
    }, 600);
  };

  const handleMultiplyEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleSetForcedNumber = (forcedNumbers) => {
    setForcedNumber(forcedNumbers);
    setShowForcedModal(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[390px]">
        {/* Calculator */}
        <div className="bg-black pt-8">
          <Display value={display} />

          <div className="grid grid-cols-4 gap-3 px-6 pb-8">
            {/* Row 1 */}
            <Button variant="lightGray" onClick={handleClear} label="AC" />
            <Button variant="lightGray" onClick={handleToggleSign} label="⁺⁄₋" />
            <Button variant="lightGray" onClick={handlePercent} label="%" />
            <Button
              variant="orange"
              onClick={() => handleOperation("÷")}
              onMouseDown={handleDivisionStart}
              onMouseUp={handleDivisionEnd}
              onTouchStart={handleDivisionStart}
              onTouchEnd={handleDivisionEnd}
              label="÷"
            />

            {/* Row 2 */}
            <Button variant="gray" onClick={() => handleNumberClick(7)} label="7" />
            <Button variant="gray" onClick={() => handleNumberClick(8)} label="8" />
            <Button variant="gray" onClick={() => handleNumberClick(9)} label="9" />
            <Button
              variant="orange"
              onClick={() => handleOperation("×")}
              onMouseDown={handleMultiplyStart}
              onMouseUp={handleMultiplyEnd}
              onTouchStart={handleMultiplyStart}
              onTouchEnd={handleMultiplyEnd}
              label="×"
            />

            {/* Row 3 */}
            <Button variant="gray" onClick={() => handleNumberClick(4)} label="4" />
            <Button variant="gray" onClick={() => handleNumberClick(5)} label="5" />
            <Button variant="gray" onClick={() => handleNumberClick(6)} label="6" />
            <Button variant="orange" onClick={() => handleOperation("-")} label="−" />

            {/* Row 4 */}
            <Button variant="gray" onClick={() => handleNumberClick(1)} label="1" />
            <Button variant="gray" onClick={() => handleNumberClick(2)} label="2" />
            <Button variant="gray" onClick={() => handleNumberClick(3)} label="3" />
            <Button
              variant="orange"
              onClick={() => handleOperation("+")}
              onMouseDown={handleAdditionStart}
              onMouseUp={handleAdditionEnd}
              onTouchStart={handleAdditionStart}
              onTouchEnd={handleAdditionEnd}
              label="+"
            />

            {/* Row 5 */}
            <Button variant="gray" onClick={handleBackspace} label="⌫" />
            <Button variant="gray" onClick={() => handleNumberClick(0)} label="0" />
            <Button variant="gray" onClick={handleDecimal} label="." />
            <Button variant="orange" onClick={handleEquals} label="=" />
          </div>
        </div>

        {/* Modals */}
        {showHistory && (
          <HistoryPanel 
            history={history} 
            onClose={() => setShowHistory(false)} 
            onClear={handleClearHistory} 
          />
        )}

        {showForcedModal && (
          <ForceNumberModal
            currentValue={forcedNumber}
            onSave={handleSetForcedNumber}
            onClose={() => setShowForcedModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Calculator


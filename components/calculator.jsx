import { useState, useRef } from "react";

const Display = ({ value }) => {
  return (
    <div className="text-white text-right pr-4 py-8 min-h-[120px] flex items-end justify-end">
      <div className="text-6xl font-light tracking-tight break-all">
        {value}
      </div>
    </div>
  );
};

const Button = ({ variant, onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, label, wide }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const baseClasses = "rounded-full flex items-center justify-center text-white font-light transition-all duration-75 cursor-pointer select-none active:scale-95";
  
  const variantClasses = {
    lightGray: `bg-[#a5a5a5] text-black ${isPressed ? 'bg-[#d4d4d4]' : ''}`,
    gray: `bg-[#424242] ${isPressed ? 'bg-[#5a5a5a]' : ''}`,
    orange: `bg-[#E08C0F] ${isPressed ? 'bg-[#ffb143]' : ''}`
  };

  const handleMouseDown = (e) => {
    setIsPressed(true);
    onMouseDown?.(e);
  };

  const handleMouseUp = (e) => {
    setIsPressed(false);
    onMouseUp?.(e);
  };

  const handleTouchStart = (e) => {
    setIsPressed(true);
    onTouchStart?.(e);
  };

  const handleTouchEnd = (e) => {
    setIsPressed(false);
    onTouchEnd?.(e);
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${wide ? 'col-span-2' : ''} h-20 text-3xl`}
      style={{ aspectRatio: wide ? '2.1/1' : '1/1' }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span className={wide ? 'ml-[-20px]' : ''}>{label}</span>
    </div>
  );
};

const Calculator = ({ onAddToHistory, onOpenHistory, onOpenForcedModal, forcedNumber, onClearForcedNumber }) => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
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
      
      onAddToHistory({
        expression: `${previousValue} ${operation} ${display}`,
        result: finalResult,
        actualResult: actualResult,
        forcedResult: forcedResult,
        timestamp,
        forced: isForced,
        operationType: operation
      });
      
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
      onOpenForcedModal();
    }, 600);
  };

  const handleAdditionEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleDivisionStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      onOpenForcedModal();
    }, 600);
  };

  const handleDivisionEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleMultiplyStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      onOpenHistory();
    }, 600);
  };

  const handleMultiplyEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-end justify-center">
        <div className="w-full max-w-sm">
          <Display value={display} />

          <div className="grid grid-cols-4 gap-3 px-4 pb-8">
            {/* Row 1 */}
            <Button variant="gray" onClick={handleClear} label="AC" />
            <Button variant="gray" onClick={handleToggleSign} label="+/-" />
            <Button variant="gray" onClick={handlePercent} label="%" />
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

            {/* Row 5 - Last Row with 3 items */}
            <Button variant="gray" onClick={handleBackspace} label="✕" />
            <Button variant="gray" onClick={() => handleNumberClick(0)} label="0" />
            <Button variant="gray" onClick={handleDecimal} label="." />
            <Button variant="orange" onClick={handleEquals} label="=" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

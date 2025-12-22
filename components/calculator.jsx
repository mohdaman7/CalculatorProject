import { useState, useRef, useEffect } from "react";
import { pincodeService } from "@/lib/pincode-service";
import { MdBackspace } from "react-icons/md";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const Display = ({ value }) => {
  return (
    <div className="text-white text-right pr-3 py-6 md:py-10 lg:py-8 xl:py-10 min-h-[100px] md:min-h-[150px] lg:min-h-[120px] xl:min-h-[140px] flex items-end justify-end">
      <div className="text-[64px] md:text-7xl lg:text-6xl xl:text-7xl font-medium tracking-tight break-all">
        {value}
      </div>
    </div>
  );
};

const ModeToast = ({ show, isNormalMode }) => {
  if (!show) return null;
  
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out">
      <div className="bg-[#1c1c1e] border border-[#3a3a3c] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-xl">
        <span className="text-sm font-medium tracking-wide">Normal Calculator</span>
        {isNormalMode ? (
          <IoCheckmarkCircle className="text-green-500" size={18} />
        ) : (
          <IoCloseCircle className="text-red-500" size={18} />
        )}
      </div>
    </div>
  );
};

const Button = ({ variant, onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, label, wide }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const baseClasses = "rounded-full lg:rounded-2xl flex items-center justify-center text-white font-medium cursor-pointer select-none aspect-square transition-all duration-100 active:scale-95 lg:hover:opacity-90";
  
  const variantClasses = {
    lightGray: "bg-[#a5a5a5] text-black lg:bg-[#2d2d2d] lg:text-white lg:shadow-lg",
    gray: "bg-[#333333] lg:bg-[#2d2d2d] lg:shadow-lg",
    orange: "bg-[#ff9500] lg:shadow-lg lg:shadow-orange-900/30"
  };

  const pressedClasses = {
    lightGray: "!bg-[#d4d4d4] lg:!bg-[#4a4a4a]",
    gray: "!bg-[#505050] lg:!bg-[#4a4a4a]",
    orange: "!bg-[#ffb340]"
  };

  const handlePressStart = (e) => {
    setIsPressed(true);
    onMouseDown?.(e);
  };

  const handlePressEnd = (e) => {
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
      className={`${baseClasses} ${variantClasses[variant]} ${isPressed ? pressedClasses[variant] : ''} ${wide ? 'col-span-2 !aspect-auto' : ''} w-full text-[32px] md:text-4xl lg:text-3xl xl:text-4xl`}
      onClick={onClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span className={wide ? 'ml-[-20px]' : ''}>{label}</span>
    </div>
  );
};

const Calculator = ({ onAddToHistory, onOpenHistory, onOpenForcedModal, forcedNumber, onClearForcedNumber, onPincodeAddress }) => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [allOperands, setAllOperands] = useState([]); // Track all operands in chain
  const longPressTimerRef = useRef(null);
  const dotLongPressTimerRef = useRef(null);
  
  const [isNormalMode, setIsNormalMode] = useState(false); // Default to force mode
  const [showModeToast, setShowModeToast] = useState(false);
  const [modeLoaded, setModeLoaded] = useState(false);

  // Load mode from localStorage on client mount only
  useEffect(() => {
    const savedMode = localStorage.getItem("calculatorMode");
    if (savedMode !== null) {
      setIsNormalMode(savedMode === "normal");
    }
    setModeLoaded(true);
  }, []);
  
  const toggleMode = () => {
    const newMode = !isNormalMode;
    setIsNormalMode(newMode);
    localStorage.setItem("calculatorMode", newMode ? "normal" : "force");
    setShowModeToast(true);
    setTimeout(() => setShowModeToast(false), 1500);
  };
  
  const handleDotLongPressStart = () => {
    dotLongPressTimerRef.current = setTimeout(() => {
      toggleMode();
      dotLongPressTimerRef.current = null;
    }, 800);
  };
  
  const handleDotLongPressEnd = () => {
    if (dotLongPressTimerRef.current) {
      clearTimeout(dotLongPressTimerRef.current);
      dotLongPressTimerRef.current = null;
      handleDecimal();
    }
  };

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
      setAllOperands([display]); // Start tracking operands
    } else if (operation) {
      if (!waitingForNewValue) {
        // User entered a new number, calculate but don't show result
        const result = performCalculation(previousValue, currentValue, operation);
        // Don't update display - keep showing current input
        setPreviousValue(result);
        setAllOperands(prev => [...prev, display]); // Add current operand to chain
      }
      // If waitingForNewValue is true, user just changed operator - don't add duplicate
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    const currentValue = Number.parseFloat(display);
    
    // Check if display is a 4-digit year (1900-2100)
    if (display.length === 4 && !operation && previousValue === null) {
      const year = parseInt(display);
      if (year >= 1900 && year <= 2100) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        const timestamp = new Date().toLocaleString();
        
        onAddToHistory({
          expression: `Year: ${display}`,
          result: age,
          actualResult: age,
          forcedResult: null,
          timestamp,
          forced: false,
          operationType: 'age_calculation',
          year: year,
          age: age,
          operands: [display]
        });
        
        // Don't change display - keep showing the year
        setWaitingForNewValue(true);
        return;
      }
    }
    
    if (previousValue !== null && operation) {
      const actualResult = performCalculation(previousValue, currentValue, operation);
      let forcedResult = null;
      let isForced = false;
      
      if (!isNormalMode && (operation === '+' || operation === '-')) {
        // Check for second force trigger first
        if (forcedNumber?.secondForceTriggerNumber != null && 
            forcedNumber?.secondForceNumber != null &&
            (currentValue === forcedNumber.secondForceTriggerNumber || 
             previousValue === forcedNumber.secondForceTriggerNumber)) {
          forcedResult = forcedNumber.secondForceNumber;
          isForced = true;
        }
        // Then check for primary forced number
        else if (forcedNumber?.forcedNumber != null) {
          forcedResult = forcedNumber.forcedNumber;
          isForced = true;
        }
      }
      
      const finalResult = isForced ? forcedResult : actualResult;
      const timestamp = new Date().toLocaleString();
      
      // Collect all operands including the final one
      const finalOperands = [...allOperands, display];
      
      // Build expression from all operands
      const expressionStr = finalOperands.join(` ${operation} `);
      
      // Find pincode from ANY operand (check each operand string)
      const pincodeOperand = finalOperands.find(op => pincodeService.isPincode(String(op)));
      const isPincodeCalc = (operation === '+' || operation === '-') && pincodeOperand;
      
      // Show result immediately - don't wait for pincode fetch
      setDisplay(String(finalResult));
      
      // Add to history immediately
      onAddToHistory({
        expression: expressionStr,
        result: finalResult,
        actualResult: actualResult,
        forcedResult: forcedResult,
        timestamp,
        forced: isForced,
        operationType: operation,
        operands: finalOperands, // Pass all operands
        // Mark as pincode calculation for later update
        pincode: isPincodeCalc ? String(pincodeOperand) : null,
        addressTaluk: null,
        addressDistrict: null,
        addressState: null
      });
      
      // Fetch pincode address in background (non-blocking)
      if (isPincodeCalc) {
        pincodeService.fetchAddress(String(pincodeOperand)).then(address => {
          if (address) {
            const pincodeData = {
              pincode: String(pincodeOperand),
              addressTaluk: address.taluk,
              addressDistrict: address.district,
              addressState: address.state
            };
            // Notify parent to update history with address
            onPincodeAddress?.(pincodeData);
          }
        });
      }
    }

    setPreviousValue(null);
    setOperation(null);
    setAllOperands([]);
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
    setAllOperands([]);
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
    if (isNormalMode) return;
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
    if (isNormalMode) return;
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
    if (isNormalMode) return;
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
    <div className="w-full min-h-[100dvh] h-full bg-black lg:bg-gradient-to-br lg:from-[#0f0f0f] lg:via-[#1a1a1a] lg:to-[#0f0f0f] flex flex-col overflow-hidden lg:overflow-auto">
      <ModeToast show={showModeToast} isNormalMode={isNormalMode} />
      <div className="flex-1 flex items-end md:items-center lg:items-center justify-center lg:p-6 xl:p-8">
        <div className="w-full lg:max-w-lg xl:max-w-xl lg:bg-gradient-to-br lg:from-[#252525] lg:to-[#1a1a1a] lg:rounded-[32px] lg:p-6 xl:p-8 lg:shadow-2xl lg:border lg:border-[#333333]/50 lg:backdrop-blur-xl">
          <Display value={display} />

          <div className="grid grid-cols-4 gap-[12px] md:gap-4 lg:gap-4 xl:gap-5 px-[2px] pb-[calc(24px+env(safe-area-inset-bottom,20px))] md:pb-16 lg:pb-0">
            {/* Row 1 */}
            <Button variant="gray" onClick={handleBackspace} label={<MdBackspace size={28} />} />
            <Button variant="gray" onClick={handleClear} label="AC" />
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

            {/* Row 5 - Last Row with 4 items */}
            <Button variant="gray" onClick={handleToggleSign} label="+/-" />
            <Button variant="gray" onClick={() => handleNumberClick(0)} label="0" />
            <Button 
              variant="gray" 
              onClick={() => {}}
              onMouseDown={handleDotLongPressStart}
              onMouseUp={handleDotLongPressEnd}
              onTouchStart={handleDotLongPressStart}
              onTouchEnd={handleDotLongPressEnd}
              label="." 
            />
            <Button variant="orange" onClick={handleEquals} label="=" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
import { useState, useRef, useEffect, useCallback } from "react";
import { safeStorage } from "@/lib/safe-storage";
import { useRouter } from "next/navigation";
import { verificationService } from "@/lib/verification-service";
import { pincodeService } from "@/lib/pincode-service";
import { IoBackspaceOutline } from "react-icons/io5";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import wordsToNumbers from "words-to-numbers";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';


/**
 * Robust multi-number, multi-operation voice math parser.
 * Tokenizes the transcript into [number, operator, number, operator, number, ...]
 * Examples:
 *   "twenty five plus three" → tokens: [25, '+', 3]
 *   "one hundred minus forty plus six" → tokens: [100, '-', 40, '+', 6]
 *   "twelve times five" → tokens: [12, '×', 5]
 */
const parseVoiceMath = (transcript) => {
  if (!transcript) return null;
  const t = transcript.toLowerCase().trim();

  // Operator keyword patterns
  const opPatterns = [
    { regex: /\b(divided by|divide by)\b|[\/÷]/, op: '÷' },
    { regex: /\b(multiplied by|multiply by|times|into)\b|[*×xX]/, op: '×' },
    { regex: /\b(added to|plus|add)\b|[+]/, op: '+' },
    { regex: /\b(subtracted from|subtract|minus|less)\b|[-−]/, op: '-' },
    { regex: /\b(equals|is|total|result)\b|[=]/, op: '=' },
  ];

  // Split regex for operators
  const splitRegex = /\b(?:divided by|divide by|multiplied by|multiply by|times|into|added to|plus|add|subtracted from|subtract|minus|less|equals|is|total|result)\b|[\/÷*×xX+−-]/gi;

  // Find all operator matches with positions
  const opMatches = [];
  let m;
  const regex = new RegExp(splitRegex.source, 'gi');
  while ((m = regex.exec(t)) !== null) {
    opMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0].trim() });
  }

  // Helper to convert segments strictly
  const convertSegment = (segment) => {
    if (!segment) return null;
    // Try literal words to numbers (NO FUZZY)
    const conv = wordsToNumbers(segment);
    if (typeof conv === 'number') return String(conv);

    // Try to extract digits
    const digits = segment.replace(/[^0-9.]/g, '');
    if (digits && !isNaN(parseFloat(digits))) return digits;

    return null;
  };

  if (opMatches.length === 0) {
    const num = convertSegment(t);
    return num ? { tokens: [num] } : null;
  }

  const tokens = [];
  let lastEnd = 0;

  for (const opM of opMatches) {
    const segment = t.slice(lastEnd, opM.start).trim();
    const num = convertSegment(segment);
    if (num) tokens.push(num);

    let opSymbol = null;
    for (const { regex: opR, op } of opPatterns) {
      if (opR.test(opM.text)) { opSymbol = op; break; }
    }
    if (opSymbol) tokens.push(opSymbol);
    lastEnd = opM.end;
  }

  const tail = t.slice(lastEnd).trim();
  const tailNum = convertSegment(tail);
  if (tailNum) tokens.push(tailNum);

  const cleanTokens = tokens.filter(tok => tok != null);
  return cleanTokens.length > 0 ? { tokens: cleanTokens } : null;
};

const formatNumberWithCommas = (value) => {
  if (!value || value === "0") return value;

  const str = String(value);

  // Handle negative numbers
  const isNegative = str.startsWith('-');
  const absoluteStr = isNegative ? str.slice(1) : str;

  // Split by decimal point
  const parts = absoluteStr.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Reconstruct the number
  let result = formattedInteger;
  if (decimalPart !== undefined) {
    result += '.' + decimalPart;
  }

  return isNegative ? '-' + result : result;
};

const Display = ({ value }) => {
  const formattedValue = formatNumberWithCommas(value);

  return (
    <div className="text-white text-right px-4 md:px-6 py-4 md:py-6 lg:py-5 xl:py-6 min-h-[80px] md:min-h-[100px] lg:min-h-[90px] xl:min-h-[100px] flex items-end justify-end">
      <div className="text-[74px] md:text-9xl lg:text-8xl xl:text-9xl font-normal tracking-[-0.05em] break-all leading-tight">
        {formattedValue}
      </div>
    </div>
  );
};

const VoiceStatus = ({ status }) => {
  return null; // Removed all status text per user request
};

const ModeToast = ({ show, isNormalMode }) => {
  if (!show) return null;

  return (
    <div className="fixed top-[calc(env(safe-area-inset-top,20px)+16px)] left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out">
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

const Button = ({ variant, onClick, onPointerDown, onPointerUp, label, wide, isOperator, isRecording }) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "rounded-full lg:rounded-2xl flex items-center cursor-pointer select-none aspect-square transition-all duration-100 active:scale-95 lg:hover:opacity-90";

  const variantClasses = {
    lightGray: "bg-[#636366] text-white lg:bg-[#636366] lg:text-white lg:shadow-lg",
    gray: "bg-[#333333] text-white lg:bg-[#333333] lg:shadow-lg",
    orange: "bg-[#ff9500] text-white lg:shadow-lg lg:shadow-orange-900/30"
  };

  const pressedClasses = {
    lightGray: "!bg-[#8e8e93] lg:!bg-[#8e8e93]",
    gray: "!bg-[#505050] lg:!bg-[#505050]",
    orange: "!bg-[#ffb340]"
  };

  const handlePointerDown = (e) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) { /* ignore capture errors */ }
    setIsPressed(true);
    // Add a light haptic feedback on touch start
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    onPointerDown?.(e);
  };

  const handlePointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) { /* ignore release errors */ }
    setIsPressed(false);
    onPointerUp?.(e);
  };

  const handlePointerLeave = (e) => {
    setIsPressed(false);
    // Trigger "up" logic to clear timers if finger slides away
    onPointerUp?.(e);
  };

  // Larger size for operators
  const textSizeClass = isOperator
    ? "text-[42px] md:text-6xl lg:text-5xl xl:text-6xl font-light"
    : "text-[32px] md:text-4xl lg:text-3xl xl:text-4xl font-medium";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${isPressed ? pressedClasses[variant] : ''} ${wide ? 'col-span-2 !aspect-auto !rounded-full justify-start pl-7 md:pl-9 lg:pl-8' : 'justify-center'} w-full ${textSizeClass} touch-none relative`}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
      {isRecording && (
        <span
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#00e676',
            boxShadow: '0 0 0 0 rgba(0, 230, 118, 0.7)',
            animation: 'voiceRecordPulse 1.2s ease-in-out infinite',
            display: 'block',
            zIndex: 10,
          }}
        />
      )}
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
  const dotModeToggledRef = useRef(false);
  const pressStartTimeRef = useRef(0);

  const [isNormalMode, setIsNormalMode] = useState(false); // Default to force mode
  const [showModeToast, setShowModeToast] = useState(false);
  const router = useRouter();
  const [modeLoaded, setModeLoaded] = useState(false);
  const [firstOperandYear, setFirstOperandYear] = useState(null);

  // ── Voice Recording with react-speech-recognition ──
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const [voiceStatus, setVoiceStatus] = useState("");
  const [isRecording, setIsRecording] = useState(listening);
  const autoStopTimerRef = useRef(null);
  const voiceHoldTimerRef = useRef(null);
  const voiceLockedRef = useRef(false);   // true while recording is locked
  const justLockedRef = useRef(false);    // suppresses the onClick after hold fires
  // holdStartTimeRef is used for +/- long press ONLY for voice
  const voiceHoldStartTimeRef = useRef(0);
  const ignoreNextClickRef = useRef(false);

  const performCalculation = useCallback((prev, current, op) => {
    switch (op) {
      case "+": return prev + current;
      case "-": return prev - current;
      case "×": return prev * current;
      case "÷": return prev / current;
      case "%": return prev % current;
      default: return current;
    }
  }, []);

  const handleToggleSign = useCallback(() => {
    const currentValue = Number.parseFloat(display);
    if (isNaN(currentValue)) return; // Safety check
    setDisplay(String(currentValue * -1));
  }, [display]);

  const handleDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForNewValue]);

  const handleOperation = useCallback((op) => {
    let currentValue = Number.parseFloat(display);

    // If we have a literal expression on display (from voice), extract the last number
    if (display.includes(' ')) {
      const parts = display.trim().split(' ');
      const lastPart = parts[parts.length - 1];
      const lastNum = Number.parseFloat(lastPart);
      if (!isNaN(lastNum)) {
        currentValue = lastNum;
      } else if (previousValue !== null) {
        currentValue = previousValue;
      }
    }

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setAllOperands([display]);

      if (display.length === 4) {
        const year = parseInt(display);
        if (year >= 1900 && year <= 2100) {
          setFirstOperandYear(year);
        } else {
          setFirstOperandYear(null);
        }
      } else {
        setFirstOperandYear(null);
      }
    } else if (operation) {
      if (!waitingForNewValue) {
        const result = performCalculation(previousValue, currentValue, operation);
        setDisplay(String(result));
        setPreviousValue(result);
        setAllOperands(prev => [...prev, String(currentValue)]);
      }
    }

    setOperation(op);
    setWaitingForNewValue(true);
  }, [display, previousValue, operation, waitingForNewValue, performCalculation]);

  const handleEquals = useCallback(() => {
    let currentValue = Number.parseFloat(display);

    // If we have a literal expression on display (from voice), extract the last number
    if (display.includes(' ')) {
      const parts = display.trim().split(' ');
      const lastPart = parts[parts.length - 1];
      const lastNum = Number.parseFloat(lastPart);
      if (!isNaN(lastNum)) {
        currentValue = lastNum;
      }
    }

    if (display.length === 4 && !operation && previousValue === null) {
      const year = parseInt(display);
      if (year >= 1900 && year <= 2026) {
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

        setWaitingForNewValue(true);
        setFirstOperandYear(null);
        return;
      }
    }

    if (previousValue !== null && operation) {
      const actualResult = performCalculation(previousValue, currentValue, operation);
      let forcedResult = null;
      let isForced = false;

      if (!isNormalMode && (operation === '+' || operation === '-')) {
        const allOperandsForCheck = [...allOperands, String(currentValue)];

        if (forcedNumber?.secondForceTriggerNumber != null &&
          forcedNumber?.secondForceNumber != null) {
          const triggerFound = allOperandsForCheck.some(operand =>
            Number.parseFloat(operand) === forcedNumber.secondForceTriggerNumber
          );
          if (triggerFound) {
            forcedResult = forcedNumber.secondForceNumber;
            isForced = true;
          }
        }
        if (!isForced && forcedNumber?.forcedNumber != null) {
          forcedResult = forcedNumber.forcedNumber;
          isForced = true;
        }
      }

      const finalResult = isForced ? forcedResult : actualResult;
      const timestamp = new Date().toLocaleString();
      const finalOperands = [...allOperands, String(currentValue)];
      const expressionStr = finalOperands.join(` ${operation} `);
      const pincodeOperand = finalOperands.find(op => pincodeService.isPincode(String(op)));
      const isPincodeCalc = (operation === '+' || operation === '-') && pincodeOperand;

      setDisplay(String(finalResult));

      let calculatedAge = null;
      if (firstOperandYear) {
        const currentYear = new Date().getFullYear();
        calculatedAge = currentYear - firstOperandYear;
      }

      onAddToHistory({
        expression: expressionStr,
        result: finalResult,
        actualResult: actualResult,
        forcedResult: forcedResult,
        timestamp,
        forced: isForced,
        operationType: operation,
        operands: finalOperands,
        age: calculatedAge,
        year: firstOperandYear,
        pincode: isPincodeCalc ? String(pincodeOperand) : null,
        addressTaluk: null,
        addressDistrict: null,
        addressState: null
      });

      if (isPincodeCalc) {
        pincodeService.fetchAddress(String(pincodeOperand)).then(address => {
          if (address) {
            const pincodeData = {
              pincode: String(pincodeOperand),
              addressTaluk: address.taluk,
              addressDistrict: address.district,
              addressState: address.state
            };
            onPincodeAddress?.(pincodeData);
          }
        });
      }
    }

    setPreviousValue(null);
    setOperation(null);
    setAllOperands([]);
    setWaitingForNewValue(true);
    setFirstOperandYear(null);
  }, [display, operation, previousValue, isNormalMode, allOperands, forcedNumber, firstOperandYear, onAddToHistory, onPincodeAddress, performCalculation]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setAllOperands([]);
    setWaitingForNewValue(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (display.length <= 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display]);

  const handlePercent = useCallback(() => {
    const currentValue = Number.parseFloat(display);
    setDisplay(String(currentValue / 100));
  }, [display]);

  const handleNumberClick = useCallback((num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  }, [display, waitingForNewValue]);



  // Load mode from localStorage on client mount only
  useEffect(() => {
    const savedMode = safeStorage.getItem("calculatorMode");
    if (savedMode !== null) {
      setIsNormalMode(savedMode === "normal");
    }
    setModeLoaded(true);
  }, []);

  const toggleMode = () => {
    const newMode = !isNormalMode;
    setIsNormalMode(newMode);
    safeStorage.setItem("calculatorMode", newMode ? "normal" : "force");
    setShowModeToast(true);
    setTimeout(() => setShowModeToast(false), 1500);
  };

  // ── Voice helpers ──
  const stopRecording = useCallback(() => {
    voiceLockedRef.current = false;
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
    SpeechRecognition.stopListening();

    // Light haptic for recording stop
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  }, []);

  const handleVoiceCommand = useCallback((text) => {
    if (!text) return;
    const parsed = parseVoiceMath(text);
    if (!parsed || !parsed.tokens || parsed.tokens.length === 0) return;

    const tokens = parsed.tokens;

    // Simulation variables
    let localDisplay = display;
    let localPreviousValue = previousValue;
    let localOperation = operation;
    let localAllOperands = [...allOperands];
    let localWaitingForNewValue = waitingForNewValue;
    let localFirstOperandYear = firstOperandYear;

    const isFirstTokenOp = ['+', '-', '×', '÷', '%'].includes(tokens[0]);
    const canAppend = localDisplay !== "0" && !isNaN(parseFloat(localDisplay));

    if (!(isFirstTokenOp && canAppend)) {
      localDisplay = "0";
      localPreviousValue = null;
      localOperation = null;
      localAllOperands = [];
      localWaitingForNewValue = false;
      localFirstOperandYear = null;
    }

    tokens.forEach((tok) => {
      const isOp = ['+', '-', '×', '÷', '%'].includes(tok);

      if (isOp) {
        const currentValue = Number.parseFloat(localDisplay);
        if (localPreviousValue === null) {
          localPreviousValue = currentValue;
          localAllOperands = [localDisplay];
        } else if (localOperation && !localWaitingForNewValue) {
          const result = performCalculation(localPreviousValue, currentValue, localOperation);
          localDisplay = String(result);
          localPreviousValue = result;
          localAllOperands.push(String(currentValue));
        }
        localOperation = tok;
        localWaitingForNewValue = true;
      } else if (tok === '=') {
        if (localPreviousValue !== null && localOperation) {
          const currentValue = Number.parseFloat(localDisplay);
          const result = performCalculation(localPreviousValue, currentValue, localOperation);
          localDisplay = String(result);
          localPreviousValue = null;
          localOperation = null;
          localAllOperands = [];
          localWaitingForNewValue = true;
        }
      } else {
        if (localWaitingForNewValue) {
          localDisplay = String(tok);
          localWaitingForNewValue = false;
        } else {
          localDisplay = localDisplay === "0" ? String(tok) : localDisplay + String(tok);
        }
      }
    });

    const hasEquals = tokens.includes('=');
    if (!hasEquals) {
      // PERSIST LITERAL EXPRESSION: Show tokens literally on display
      setDisplay(tokens.join(' '));
    } else {
      setDisplay(localDisplay);
    }

    setPreviousValue(localPreviousValue);
    setOperation(localOperation);
    setAllOperands(localAllOperands);
    setWaitingForNewValue(localWaitingForNewValue);
    setFirstOperandYear(localFirstOperandYear);

    resetTranscript();

    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (hasEquals) {
      // Delay processing of equals on iOS to ensure transcript is stable
      setTimeout(() => handleEquals(), isIOS ? 100 : 0);
    }
  }, [display, previousValue, operation, allOperands, waitingForNewValue, firstOperandYear, handleEquals, performCalculation, resetTranscript]);

  useEffect(() => {
    if (!listening && transcript) {
      handleVoiceCommand(transcript);
    }
  }, [listening, transcript, handleVoiceCommand]);


  const startRecording = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      setDisplay("Not Supported");
      return;
    }

    resetTranscript();
    voiceLockedRef.current = true;

    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-IN',
      interimResults: true
    });

    // Stronger haptic for recording start
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([20, 10, 20]);
    }

    // Hard 30-second auto-stop
    autoStopTimerRef.current = setTimeout(() => {
      stopRecording();
    }, 30000);
  }, [browserSupportsSpeechRecognition, resetTranscript, stopRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
      if (voiceHoldTimerRef.current) clearTimeout(voiceHoldTimerRef.current);
    };
  }, [stopRecording]);

  const handleToggleSignPointerDown = () => {
    voiceHoldStartTimeRef.current = Date.now();
    justLockedRef.current = false;
    ignoreNextClickRef.current = false;

    if (voiceLockedRef.current) return; // already recording — let click handle stop

    // Start recording immediately
    startRecording();

    voiceHoldTimerRef.current = setTimeout(() => {
      voiceHoldTimerRef.current = null;
      justLockedRef.current = true;   // lock it for long press
    }, 1000);
  };

  const handleToggleSignPointerUp = () => {
    const duration = Date.now() - voiceHoldStartTimeRef.current;

    if (voiceHoldTimerRef.current) {
      clearTimeout(voiceHoldTimerRef.current);
      voiceHoldTimerRef.current = null;
    }

    // SHORT PRESS LOGIC (< 1s)
    // Only toggle sign if we are NOT in a locked recording session
    if (duration < 1000 && !justLockedRef.current && !voiceLockedRef.current) {
      stopRecording();
      handleToggleSign();
      ignoreNextClickRef.current = true;
    }
  };

  const handleToggleSignClick = () => {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }
    if (justLockedRef.current) {
      justLockedRef.current = false;
      return;
    }
    if (voiceLockedRef.current) {
      stopRecording();
      return;
    }
    handleToggleSign();
  };

  // = button is now pure equals — no voice logic
  const handleEqualsClick = () => {
    handleEquals();
  };

  const handleDotLongPressStart = () => {
    if (dotLongPressTimerRef.current) clearTimeout(dotLongPressTimerRef.current);
    dotModeToggledRef.current = false;
    pressStartTimeRef.current = Date.now();

    dotLongPressTimerRef.current = setTimeout(() => {
      toggleMode();
      dotModeToggledRef.current = true;
      dotLongPressTimerRef.current = null;
    }, 600);
  };

  const handleDotLongPressEnd = () => {
    if (dotLongPressTimerRef.current) {
      clearTimeout(dotLongPressTimerRef.current);
      dotLongPressTimerRef.current = null;
    }

    const pressDuration = Date.now() - pressStartTimeRef.current;

    // Only add decimal if:
    // 1. Mode was NOT toggled
    // 2. Press was relatively short (under 400ms) to ensure it wasn't a failed long-press
    if (!dotModeToggledRef.current && pressDuration < 400) {
      handleDecimal();
    }

    dotModeToggledRef.current = false;
    pressStartTimeRef.current = 0;
  };



  useEffect(() => {
    setIsRecording(listening);
    if (listening) {
      if (!isMicrophoneAvailable) {
        setDisplay("Mic Error");
      } else if (transcript) {
        const parsed = parseVoiceMath(transcript);
        if (parsed && parsed.tokens) {
          const expression = parsed.tokens.join(' ');
          // Safety: Don't show NaN or empty noise
          if (expression && !expression.includes("NaN")) {
            setDisplay(expression);
          }

          if (parsed.tokens.includes('=')) {
            stopRecording();
          }
        }
      }
    }
  }, [listening, transcript, isMicrophoneAvailable, stopRecording]);

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
    <div className="w-full min-h-screen min-h-[100dvh] h-full bg-black lg:bg-gradient-to-br lg:from-[#0f0f0f] lg:via-[#1a1a1a] lg:to-[#0f0f0f] flex flex-col overflow-hidden lg:overflow-auto">
      <ModeToast show={showModeToast} isNormalMode={isNormalMode} />
      <div className="flex-1 flex items-end md:items-center lg:items-center justify-center lg:p-6 xl:p-8">
        <div className="w-full lg:max-w-lg xl:max-w-xl lg:bg-gradient-to-br lg:from-[#252525] lg:to-[#1a1a1a] lg:rounded-[32px] lg:p-6 xl:p-8 lg:shadow-2xl lg:border lg:border-[#333333]/50 lg:backdrop-blur-xl relative">
          <VoiceStatus status={voiceStatus} />
          <Display value={display} />

          <div className="grid grid-cols-4 gap-[10px] md:gap-3 lg:gap-3 xl:gap-4 px-4 md:px-6 pb-[calc(2px+env(safe-area-inset-bottom,2px))] md:pb-6 lg:pb-0">
            {/* Row 1 - Updated with lightGray variant for iOS style */}
            <Button variant="lightGray" onClick={handleBackspace} label={<IoBackspaceOutline size={42} />} />
            <Button variant="lightGray" onClick={handleClear} label="AC" />
            <Button variant="lightGray" onClick={handlePercent} label="%" />
            <Button
              variant="orange"
              onClick={() => handleOperation("÷")}
              onPointerDown={handleDivisionStart}
              onPointerUp={handleDivisionEnd}
              label="÷"
              isOperator={true}
            />

            {/* Row 2 */}
            <Button variant="gray" onClick={() => handleNumberClick(7)} label="7" />
            <Button variant="gray" onClick={() => handleNumberClick(8)} label="8" />
            <Button variant="gray" onClick={() => handleNumberClick(9)} label="9" />
            <Button
              variant="orange"
              onClick={() => handleOperation("×")}
              onPointerDown={handleMultiplyStart}
              onPointerUp={handleMultiplyEnd}
              label="×"
              isOperator={true}
            />

            {/* Row 3 */}
            <Button variant="gray" onClick={() => handleNumberClick(4)} label="4" />
            <Button variant="gray" onClick={() => handleNumberClick(5)} label="5" />
            <Button variant="gray" onClick={() => handleNumberClick(6)} label="6" />
            <Button variant="orange" onClick={() => handleOperation("-")} label="−" isOperator={true} />

            {/* Row 4 */}
            <Button variant="gray" onClick={() => handleNumberClick(1)} label="1" />
            <Button variant="gray" onClick={() => handleNumberClick(2)} label="2" />
            <Button variant="gray" onClick={() => handleNumberClick(3)} label="3" />
            <Button
              variant="orange"
              onClick={() => handleOperation("+")}
              onPointerDown={handleAdditionStart}
              onPointerUp={handleAdditionEnd}
              label="+"
              isOperator={true}
            />

            {/* Row 5 - Last Row */}
            <Button
              variant="gray"
              onClick={handleToggleSignClick}
              onPointerDown={handleToggleSignPointerDown}
              onPointerUp={handleToggleSignPointerUp}
              label="+/−"
              isRecording={isRecording}
            />
            <Button variant="gray" onClick={() => handleNumberClick(0)} label="0" />
            <Button
              variant="gray"
              onClick={() => { }}
              onPointerDown={handleDotLongPressStart}
              onPointerUp={handleDotLongPressEnd}
              label="."
            />
            <Button
              variant="orange"
              onClick={handleEqualsClick}
              label="="
              isOperator={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
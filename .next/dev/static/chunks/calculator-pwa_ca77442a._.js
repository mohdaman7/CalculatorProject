(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/calculator-pwa/components/calculator.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const Display = ({ value })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-white text-right pr-4 py-8 min-h-[120px] flex items-end justify-end",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-6xl font-light tracking-tight break-all",
            children: value
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/calculator.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/calculator.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Display;
const Button = ({ variant, onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, label, wide })=>{
    _s();
    const [isPressed, setIsPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const baseClasses = "rounded-full flex items-center justify-center text-white font-light transition-all duration-75 cursor-pointer select-none active:scale-95";
    const variantClasses = {
        lightGray: `bg-[#a5a5a5] text-black ${isPressed ? 'bg-[#d4d4d4]' : ''}`,
        gray: `bg-[#424242] ${isPressed ? 'bg-[#5a5a5a]' : ''}`,
        orange: `bg-[#E08C0F] ${isPressed ? 'bg-[#ffb143]' : ''}`
    };
    const handleMouseDown = (e)=>{
        setIsPressed(true);
        onMouseDown?.(e);
    };
    const handleMouseUp = (e)=>{
        setIsPressed(false);
        onMouseUp?.(e);
    };
    const handleTouchStart = (e)=>{
        setIsPressed(true);
        onTouchStart?.(e);
    };
    const handleTouchEnd = (e)=>{
        setIsPressed(false);
        onTouchEnd?.(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${baseClasses} ${variantClasses[variant]} ${wide ? 'col-span-2' : ''} h-20 text-3xl`,
        style: {
            aspectRatio: wide ? '2.1/1' : '1/1'
        },
        onClick: onClick,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: ()=>setIsPressed(false),
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: wide ? 'ml-[-20px]' : '',
            children: label
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/calculator.jsx",
            lineNumber: 55,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/calculator.jsx",
        lineNumber: 45,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Button, "xbZH3DzXyTYDyv25dIidXDvNjLA=");
_c1 = Button;
const Calculator = ({ onAddToHistory, onOpenHistory, onOpenForcedModal, forcedNumber, onClearForcedNumber })=>{
    _s1();
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("0");
    const [previousValue, setPreviousValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [operation, setOperation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [waitingForNewValue, setWaitingForNewValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const longPressTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleNumberClick = (num)=>{
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === "0" ? String(num) : display + num);
        }
    };
    const handleDecimal = ()=>{
        if (waitingForNewValue) {
            setDisplay("0.");
            setWaitingForNewValue(false);
        } else if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };
    const handleOperation = (op)=>{
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
    const handleEquals = ()=>{
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
                    age: age
                });
                setDisplay(String(age));
                setWaitingForNewValue(true);
                return;
            }
        }
        if (previousValue !== null && operation) {
            const actualResult = performCalculation(previousValue, currentValue, operation);
            let forcedResult = null;
            let isForced = false;
            if (operation === '+' || operation === '-') {
                if (forcedNumber?.secondForceTriggerNumber !== null && (currentValue === forcedNumber.secondForceTriggerNumber || previousValue === forcedNumber.secondForceTriggerNumber)) {
                    forcedResult = forcedNumber.secondForceNumber;
                    isForced = true;
                } else if (forcedNumber?.forcedNumber !== null) {
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
    const performCalculation = (prev, current, op)=>{
        switch(op){
            case "+":
                return prev + current;
            case "-":
                return prev - current;
            case "×":
                return prev * current;
            case "÷":
                return prev / current;
            case "%":
                return prev % current;
            default:
                return current;
        }
    };
    const handleClear = ()=>{
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };
    const handleToggleSign = ()=>{
        const currentValue = Number.parseFloat(display);
        setDisplay(String(currentValue * -1));
    };
    const handlePercent = ()=>{
        const currentValue = Number.parseFloat(display);
        setDisplay(String(currentValue / 100));
    };
    const handleBackspace = ()=>{
        if (display.length === 1) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };
    const handleAdditionStart = ()=>{
        longPressTimerRef.current = setTimeout(()=>{
            onOpenForcedModal();
        }, 600);
    };
    const handleAdditionEnd = ()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    };
    const handleDivisionStart = ()=>{
        longPressTimerRef.current = setTimeout(()=>{
            onOpenForcedModal();
        }, 600);
    };
    const handleDivisionEnd = ()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    };
    const handleMultiplyStart = ()=>{
        longPressTimerRef.current = setTimeout(()=>{
            onOpenHistory();
        }, 600);
    };
    const handleMultiplyEnd = ()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-screen bg-black flex flex-col",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex items-end justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Display, {
                        value: display
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-3 px-4 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: handleClear,
                                label: "AC"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: handleToggleSign,
                                label: "+/-"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: handlePercent,
                                label: "%"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "orange",
                                onClick: ()=>handleOperation("÷"),
                                onMouseDown: handleDivisionStart,
                                onMouseUp: handleDivisionEnd,
                                onTouchStart: handleDivisionStart,
                                onTouchEnd: handleDivisionEnd,
                                label: "÷"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(7),
                                label: "7"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(8),
                                label: "8"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(9),
                                label: "9"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "orange",
                                onClick: ()=>handleOperation("×"),
                                onMouseDown: handleMultiplyStart,
                                onMouseUp: handleMultiplyEnd,
                                onTouchStart: handleMultiplyStart,
                                onTouchEnd: handleMultiplyEnd,
                                label: "×"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(4),
                                label: "4"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(5),
                                label: "5"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(6),
                                label: "6"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 278,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "orange",
                                onClick: ()=>handleOperation("-"),
                                label: "−"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(1),
                                label: "1"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(2),
                                label: "2"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(3),
                                label: "3"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "orange",
                                onClick: ()=>handleOperation("+"),
                                onMouseDown: handleAdditionStart,
                                onMouseUp: handleAdditionEnd,
                                onTouchStart: handleAdditionStart,
                                onTouchEnd: handleAdditionEnd,
                                label: "+"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: handleBackspace,
                                label: "✕"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: ()=>handleNumberClick(0),
                                label: "0"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "gray",
                                onClick: handleDecimal,
                                label: "."
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "orange",
                                onClick: handleEquals,
                                label: "="
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                lineNumber: 243,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/calculator.jsx",
            lineNumber: 242,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/calculator.jsx",
        lineNumber: 241,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(Calculator, "CP1l4ggF5qcBduYhM68KLotBelk=");
_c2 = Calculator;
const __TURBOPACK__default__export__ = Calculator;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Display");
__turbopack_context__.k.register(_c1, "Button");
__turbopack_context__.k.register(_c2, "Calculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/history-panel.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
const HistoryPanel = ({ history, onClose, onClear })=>{
    // Parse expression to get operands
    const parseExpression = (expression)=>{
        // Expression format: "10 + 20" or "10 - 5" etc
        const parts = expression.split(/\s+/);
        return {
            firstOperand: parts[0],
            operator: parts[1],
            secondOperand: parts[2]
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black z-50 flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center pt-3 pb-6 px-6 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/sandeep.png",
                    alt: "Sandeep Fradian",
                    width: 400,
                    height: 100,
                    className: "w-64 h-auto"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto px-6 pb-32",
                children: history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-20 text-[#666] text-base",
                    children: "No history yet"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8 pt-2",
                    children: history.map((entry, idx)=>{
                        // Check if this is an age calculation entry
                        if (entry.operationType === 'age_calculation') {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white text-5xl font-light tracking-tight mb-4",
                                        children: entry.year
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                        lineNumber: 42,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-400 text-sm mb-2",
                                        children: "Age"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                        lineNumber: 47,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white text-5xl font-light tracking-tight",
                                        children: entry.age
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                        lineNumber: 52,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, idx, true, {
                                fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                lineNumber: 40,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                        // Regular calculation entry
                        const { firstOperand, operator, secondOperand } = parseExpression(entry.expression);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white text-5xl font-light tracking-tight mb-4",
                                    children: firstOperand
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                    lineNumber: 64,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white text-5xl font-light tracking-tight",
                                    children: secondOperand
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                    lineNumber: 69,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, idx, true, {
                            fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                            lineNumber: 62,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 flex justify-center pb-18 pt-4 bg-gradient-to-t from-black via-black to-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClear,
                    className: "bg-transparent border border-white/80 text-white font-normal text-base py-2.5 px-12 rounded-lg transition-all hover:bg-white/5 active:bg-white/10",
                    children: "Clear"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10",
                "aria-label": "Close",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = HistoryPanel;
const __TURBOPACK__default__export__ = HistoryPanel;
var _c;
__turbopack_context__.k.register(_c, "HistoryPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/forced-number-modal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ForcedNumberModal = ({ currentValue, onSave, onClose })=>{
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        forcedNumber: currentValue?.forcedNumber ? String(currentValue.forcedNumber) : "",
        secondForceNumber: currentValue?.secondForceNumber ? String(currentValue.secondForceNumber) : "",
        secondForceTriggerNumber: currentValue?.secondForceTriggerNumber ? String(currentValue.secondForceTriggerNumber) : ""
    });
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleSave = ()=>{
        const data = {};
        if (formData.forcedNumber.trim()) data.forcedNumber = Number.parseFloat(formData.forcedNumber);
        else data.forcedNumber = null;
        if (formData.secondForceNumber.trim()) data.secondForceNumber = Number.parseFloat(formData.secondForceNumber);
        else data.secondForceNumber = null;
        if (formData.secondForceTriggerNumber.trim()) data.secondForceTriggerNumber = Number.parseFloat(formData.secondForceTriggerNumber);
        else data.secondForceTriggerNumber = null;
        onSave(data);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black z-50 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "100%",
                    height: "100%",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                id: "pattern",
                                x: "0",
                                y: "0",
                                width: "100",
                                height: "100",
                                patternUnits: "userSpaceOnUse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "40",
                                        fill: "none",
                                        stroke: "#666",
                                        strokeWidth: "0.5",
                                        opacity: "0.3"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M50 10 L90 90 M10 90 L90 10",
                                        stroke: "#666",
                                        strokeWidth: "0.5",
                                        opacity: "0.2"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            width: "100%",
                            height: "100%",
                            fill: "url(#pattern)"
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/sandeep.png",
                                alt: "Sandeep Fradian",
                                width: 800,
                                height: 250,
                                className: "mx-auto h-56 w-auto",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-sm space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center",
                                        children: "Forcing Number"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: formData.forcedNumber,
                                        onChange: (e)=>handleInputChange('forcedNumber', e.target.value),
                                        placeholder: "Enter forced value",
                                        className: "w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center",
                                        children: "Second Force Number"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: formData.secondForceNumber,
                                        onChange: (e)=>handleInputChange('secondForceNumber', e.target.value),
                                        placeholder: "Enter second force value",
                                        className: "w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center",
                                        children: "Second Force Trigger Number"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: formData.secondForceTriggerNumber,
                                        onChange: (e)=>handleInputChange('secondForceTriggerNumber', e.target.value),
                                        placeholder: "Enter trigger number",
                                        className: "w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center pt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    className: "px-12 py-3 border-2 border-white text-white font-semibold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all duration-300",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 flex flex-col items-center space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-56 h-56",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.png",
                                    alt: "Art of Mentalism",
                                    width: 224,
                                    height: 224,
                                    className: "w-full h-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-sm font-semibold uppercase tracking-widest",
                                        children: "AOM FORCE V1"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-xs uppercase tracking-widest",
                                        children: "2025 COPYRIGHT TO SANDEEP FRADIAN"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-6 right-6 text-gray-400 hover:text-white transition-colors",
                        "aria-label": "Close",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-6 h-6",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ForcedNumberModal, "BkFxC7FXbV0ZeWnS3uGYyYIxKJY=");
_c = ForcedNumberModal;
const __TURBOPACK__default__export__ = ForcedNumberModal;
var _c;
__turbopack_context__.k.register(_c, "ForcedNumberModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/birth-year-modal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const BirthYearModal = ({ isOpen, onClose, onSubmit, initialYear = null, isLoading = false })=>{
    _s();
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialYear?.toString() || '');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const currentYear = new Date().getFullYear();
    const handleSubmit = (e)=>{
        e.preventDefault();
        setError('');
        // Validate input
        if (!year) {
            setError('Please enter a birth year');
            return;
        }
        const birthYear = parseInt(year, 10);
        if (isNaN(birthYear)) {
            setError('Please enter a valid year');
            return;
        }
        if (birthYear < 1900 || birthYear > currentYear) {
            setError(`Birth year must be between 1900 and ${currentYear}`);
            return;
        }
        const age = currentYear - birthYear;
        if (age > 150) {
            setError('Please enter a valid birth year');
            return;
        }
        onSubmit(birthYear);
        setYear('');
        setError('');
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#1c1c1c] rounded-2xl p-8 max-w-sm w-full mx-4 border border-[#333]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-white text-2xl font-light mb-6 text-center",
                    children: "Enter Birth Year"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: year,
                                onChange: (e)=>{
                                    setYear(e.target.value);
                                    setError('');
                                },
                                placeholder: "e.g., 1998",
                                min: "1900",
                                max: currentYear,
                                className: "w-full bg-[#333] text-white px-4 py-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F0A] placeholder-gray-500",
                                disabled: isLoading,
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400 text-sm text-center",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        year && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-400 text-sm text-center",
                            children: [
                                "Age: ",
                                currentYear - parseInt(year, 10),
                                " years"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    disabled: isLoading,
                                    className: "flex-1 bg-transparent border border-white/30 text-white py-3 rounded-lg font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "flex-1 bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Saving..."
                                        ]
                                    }, void 0, true) : 'Calculate Age'
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
            lineNumber: 48,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/birth-year-modal.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BirthYearModal, "21Z87cUHAvXfyMUpAH/rNRaNGrI=");
_c = BirthYearModal;
const __TURBOPACK__default__export__ = BirthYearModal;
var _c;
__turbopack_context__.k.register(_c, "BirthYearModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/display.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Display
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Display({ value, forcedNumber }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-4 sm:mb-6 text-right",
        children: [
            forcedNumber !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs sm:text-sm text-orange-500 font-medium mb-2 sm:mb-3 opacity-80",
                children: [
                    "Forced: ",
                    forcedNumber
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/display.jsx",
                lineNumber: 7,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-4xl sm:text-5xl md:text-7xl text-white font-light tracking-tight break-words word-break",
                children: value
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/display.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calculator-pwa/components/display.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Display;
var _c;
__turbopack_context__.k.register(_c, "Display");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/button.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Calculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$display$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/display.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Calculator({ onAddToHistory, onOpenHistory, onOpenForcedModal, forcedNumber, onClearForcedNumber }) {
    _s();
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("0");
    const [previousValue, setPreviousValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [operation, setOperation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [waitingForNewValue, setWaitingForNewValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const longPressTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleNumberClick = (num)=>{
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === "0" ? String(num) : display + num);
        }
    };
    const handleDecimal = ()=>{
        if (waitingForNewValue) {
            setDisplay("0.");
            setWaitingForNewValue(false);
        } else if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };
    const handleOperation = (op)=>{
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
    const handleEquals = ()=>{
        if (forcedNumber !== null) {
            const timestamp = new Date().toLocaleString();
            onAddToHistory({
                expression: `${previousValue} ${operation} ${display}`,
                result: forcedNumber,
                timestamp,
                forced: true
            });
            setDisplay(String(forcedNumber));
            onClearForcedNumber();
        } else if (previousValue !== null && operation) {
            const currentValue = Number.parseFloat(display);
            const result = performCalculation(previousValue, currentValue, operation);
            const timestamp = new Date().toLocaleString();
            onAddToHistory({
                expression: `${previousValue} ${operation} ${display}`,
                result,
                timestamp,
                forced: false
            });
            setDisplay(String(result));
        }
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
    };
    const performCalculation = (prev, current, op)=>{
        switch(op){
            case "+":
                return prev + current;
            case "-":
                return prev - current;
            case "×":
                return prev * current;
            case "÷":
                return prev / current;
            case "%":
                return prev % current;
            default:
                return current;
        }
    };
    const handleClear = ()=>{
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };
    const handleToggleSign = ()=>{
        const currentValue = Number.parseFloat(display);
        setDisplay(String(currentValue * -1));
    };
    const handleDivideStart = ()=>{
        longPressTimerRef.current = setTimeout(()=>{
            onOpenForcedModal();
        }, 600);
    };
    const handleDivideEnd = ()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    };
    const handleMultiplyStart = ()=>{
        longPressTimerRef.current = setTimeout(()=>{
            onOpenHistory();
        }, 600);
    };
    const handleMultiplyEnd = ()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
        }
    };
    const handleBackspace = ()=>{
        if (display.length === 1) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md sm:max-w-lg md:max-w-2xl px-3 sm:px-6 py-6 sm:py-8 bg-black rounded-2xl sm:rounded-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$display$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: display,
                forcedNumber: forcedNumber
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/button.jsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleClear,
                        label: "AC"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleToggleSign,
                        label: "+/-"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleOperation("%"),
                        label: "%"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("÷"),
                        onMouseDown: handleDivideStart,
                        onMouseUp: handleDivideEnd,
                        onTouchStart: handleDivideStart,
                        onTouchEnd: handleDivideEnd,
                        label: "÷"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(7),
                        label: "7"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(8),
                        label: "8"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(9),
                        label: "9"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("×"),
                        onMouseDown: handleMultiplyStart,
                        onMouseUp: handleMultiplyEnd,
                        onTouchStart: handleMultiplyStart,
                        onTouchEnd: handleMultiplyEnd,
                        label: "×"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(4),
                        label: "4"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(5),
                        label: "5"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(6),
                        label: "6"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("-"),
                        label: "-"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(1),
                        label: "1"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(2),
                        label: "2"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(3),
                        label: "3"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("+"),
                        label: "+"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleBackspace,
                        label: "✕",
                        isIcon: true,
                        shape: "square"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(0),
                        label: "0"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleDecimal,
                        label: "."
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: handleEquals,
                        label: "="
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/button.jsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/button.jsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calculator-pwa/components/button.jsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(Calculator, "CP1l4ggF5qcBduYhM68KLotBelk=");
_c = Calculator;
var _c;
__turbopack_context__.k.register(_c, "Calculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/auth-modal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/contexts/AuthContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/button.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthModal({ onClose }) {
    _s();
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { login, register, logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.username, formData.email, formData.password);
            }
            onClose();
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    };
    const handleInputChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleLogout = async ()=>{
        logout();
        onClose();
    };
    if (user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-6 w-96 max-w-full mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4 text-black",
                        children: "Account"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 text-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Username:"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                        lineNumber: 56,
                                        columnNumber: 33
                                    }, this),
                                    " ",
                                    user.username
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Email:"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                        lineNumber: 57,
                                        columnNumber: 33
                                    }, this),
                                    " ",
                                    user.email
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Forced Number:"
                                    }, void 0, false, {
                                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                        lineNumber: 58,
                                        columnNumber: 33
                                    }, this),
                                    " ",
                                    user.forcedNumber || 'Not set'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "orange",
                                onClick: handleLogout,
                                label: "Logout",
                                className: "flex-1 auth"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "gray",
                                onClick: onClose,
                                label: "Close",
                                className: "flex-1 auth"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 w-96 max-w-full mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4 text-black",
                    children: isLogin ? "Login" : "Register"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Username"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "username",
                                    value: formData.username,
                                    onChange: handleInputChange,
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                    placeholder: "Enter username",
                                    required: !isLogin
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    name: "email",
                                    value: formData.email,
                                    onChange: handleInputChange,
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                    placeholder: "Enter email",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    name: "password",
                                    value: formData.password,
                                    onChange: handleInputChange,
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                    placeholder: "Enter password",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    type: "submit",
                                    variant: "orange",
                                    disabled: loading,
                                    label: loading ? "Please wait..." : isLogin ? "Login" : "Register",
                                    className: "flex-1 auth"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    type: "button",
                                    variant: "gray",
                                    onClick: onClose,
                                    label: "Cancel",
                                    className: "flex-1 auth"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-black",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setIsLogin(!isLogin);
                            setError("");
                        },
                        className: "text-blue-500 hover:text-blue-700 text-sm",
                        children: isLogin ? "Don't have an account? Register" : "Already have an account? Login"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(AuthModal, "SUFc2kVB8lNP/odKPWSGAvNLb20=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
class ApiService {
    constructor(){
        this.token = null;
        this.loadToken();
    }
    loadToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            this.token = localStorage.getItem('calculator_token');
        }
    }
    saveToken(token) {
        this.token = token;
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('calculator_token', token);
        }
    }
    removeToken() {
        this.token = null;
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('calculator_token');
        }
    }
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    // Authentication endpoints
    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        this.saveToken(data.token);
        return data;
    }
    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        this.saveToken(data.token);
        return data;
    }
    async getCurrentUser() {
        return this.request('/auth/me');
    }
    async updateForcedNumber(forcedNumbers) {
        return this.request('/auth/forced-number', {
            method: 'PUT',
            body: JSON.stringify(forcedNumbers)
        });
    }
    async updateBirthYear(birthYear) {
        return this.request('/auth/birth-year', {
            method: 'PUT',
            body: JSON.stringify({
                birthYear
            })
        });
    }
    // Calculator endpoints
    async saveCalculation(calculationData) {
        return this.request('/calculator/history', {
            method: 'POST',
            body: JSON.stringify(calculationData)
        });
    }
    async getHistory(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/calculator/history?${queryString}`);
    }
    async clearHistory(deviceId) {
        const params = deviceId ? {
            deviceId
        } : {};
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/calculator/history?${queryString}`, {
            method: 'DELETE'
        });
    }
    async syncCalculations(calculations) {
        return this.request('/calculator/sync', {
            method: 'POST',
            body: JSON.stringify({
                calculations
            })
        });
    }
    async getStats() {
        return this.request('/calculator/stats');
    }
    // Health check
    async healthCheck() {
        return this.request('/health');
    }
    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }
    // Logout
    logout() {
        this.removeToken();
    }
}
const apiService = new ApiService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/components/home-wrapper.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$calculator$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/calculator.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$history$2d$panel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/history-panel.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$forced$2d$number$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/forced-number-modal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$birth$2d$year$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/birth-year-modal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$auth$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/auth-modal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/contexts/AuthContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function HomeWrapper() {
    _s();
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showForcedModal, setShowForcedModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showBirthYearModal, setShowBirthYearModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [forcedNumber, setForcedNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [syncStatus, setSyncStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('offline');
    const [birthYearLoading, setBirthYearLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthenticated, updateForcedNumber, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Load from localStorage and backend on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeWrapper.useEffect": ()=>{
            const loadData = {
                "HomeWrapper.useEffect.loadData": async ()=>{
                    // Always load from localStorage first
                    const savedHistory = localStorage.getItem("calculatorHistory");
                    const savedForcedNumber = localStorage.getItem("forcedNumber");
                    if (savedHistory) {
                        setHistory(JSON.parse(savedHistory));
                    }
                    if (savedForcedNumber) {
                        setForcedNumber(JSON.parse(savedForcedNumber));
                    }
                    // If authenticated, load from backend
                    if (isAuthenticated && user && !loading) {
                        try {
                            const backendHistory = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].getHistory({
                                forcedOnly: false
                            });
                            if (backendHistory.history && backendHistory.history.length > 0) {
                                const formattedHistory = backendHistory.history.map({
                                    "HomeWrapper.useEffect.loadData.formattedHistory": (item)=>({
                                            id: item._id,
                                            expression: item.expression,
                                            result: item.forcedResult || item.actualResult,
                                            actualResult: item.actualResult,
                                            forcedResult: item.forcedResult,
                                            timestamp: new Date(item.createdAt).toLocaleString(),
                                            forced: item.wasForced,
                                            synced: true
                                        })
                                }["HomeWrapper.useEffect.loadData.formattedHistory"]);
                                setHistory(formattedHistory);
                                localStorage.setItem("calculatorHistory", JSON.stringify(formattedHistory));
                            }
                        } catch (error) {
                            console.error('Failed to load history from backend:', error);
                        }
                        // Load forced numbers from user profile
                        setForcedNumber({
                            forcedNumber: user.forcedNumber,
                            secondForceNumber: user.secondForceNumber,
                            secondForceTriggerNumber: user.secondForceTriggerNumber
                        });
                    }
                }
            }["HomeWrapper.useEffect.loadData"];
            loadData();
        }
    }["HomeWrapper.useEffect"], [
        isAuthenticated,
        user,
        loading
    ]);
    // Save to localStorage whenever history changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeWrapper.useEffect": ()=>{
            localStorage.setItem("calculatorHistory", JSON.stringify(history));
        }
    }["HomeWrapper.useEffect"], [
        history
    ]);
    // Save to localStorage whenever forcedNumber changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeWrapper.useEffect": ()=>{
            localStorage.setItem("forcedNumber", JSON.stringify(forcedNumber));
        }
    }["HomeWrapper.useEffect"], [
        forcedNumber
    ]);
    // Sync with backend when online and authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeWrapper.useEffect": ()=>{
            if (isAuthenticated && navigator.onLine && !loading) {
                syncWithBackend();
            }
        }
    }["HomeWrapper.useEffect"], [
        isAuthenticated,
        loading
    ]);
    const syncWithBackend = async ()=>{
        try {
            setSyncStatus('syncing');
            // Get offline calculations that haven't been synced
            const offlineHistory = history.filter((item)=>!item.synced);
            if (offlineHistory.length > 0) {
                const calculationsToSync = offlineHistory.map((item)=>({
                        expression: item.expression,
                        actualResult: item.actualResult || item.result,
                        forcedResult: item.forced ? item.result : null,
                        wasForced: item.forced,
                        operationType: getOperationType(item.expression),
                        deviceId: getDeviceId()
                    }));
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].syncCalculations(calculationsToSync);
                // Mark as synced
                const updatedHistory = history.map((item)=>({
                        ...item,
                        synced: true
                    }));
                setHistory(updatedHistory);
            }
            // Load latest history from backend
            const backendHistory = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].getHistory({
                forcedOnly: true
            });
            const formattedHistory = backendHistory.history.map((item)=>({
                    id: item._id,
                    expression: item.expression,
                    result: item.forcedResult || item.actualResult,
                    timestamp: new Date(item.createdAt).toLocaleString(),
                    forced: item.wasForced,
                    synced: true
                }));
            // Merge with local history (avoid duplicates)
            const mergedHistory = [
                ...formattedHistory,
                ...history.filter((local)=>!formattedHistory.some((backend)=>backend.expression === local.expression))
            ];
            setHistory(mergedHistory.slice(0, 100)); // Keep only last 100 items
            setSyncStatus('online');
        } catch (error) {
            console.error('Sync failed:', error);
            setSyncStatus('offline');
        }
    };
    const getOperationType = (expression)=>{
        if (expression.includes('+')) return 'addition';
        if (expression.includes('-')) return 'subtraction';
        if (expression.includes('×')) return 'multiplication';
        if (expression.includes('÷')) return 'division';
        return 'mixed';
    };
    const getDeviceId = ()=>{
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    };
    const handleAddToHistory = async (entry)=>{
        const newEntry = {
            ...entry,
            id: Date.now(),
            synced: false
        };
        setHistory([
            newEntry,
            ...history
        ]);
        // Save to backend if authenticated (save ALL calculations)
        if (isAuthenticated) {
            try {
                const payload = {
                    expression: entry.expression,
                    actualResult: entry.actualResult || entry.result,
                    forcedResult: entry.forced ? entry.result : null,
                    wasForced: entry.forced,
                    operationType: entry.operationType || getOperationType(entry.expression),
                    deviceId: getDeviceId()
                };
                // Add age calculation specific fields
                if (entry.operationType === 'age_calculation') {
                    payload.year = entry.year;
                    payload.age = entry.age;
                }
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].saveCalculation(payload);
                // Mark as synced
                setHistory((prev)=>prev.map((item)=>item.id === newEntry.id ? {
                            ...item,
                            synced: true
                        } : item));
            } catch (error) {
                console.error('Failed to save to backend:', error);
            // Keep it marked as unsynced for later sync
            }
        }
    };
    const handleBirthYearSubmit = async (birthYear)=>{
        setBirthYearLoading(true);
        try {
            // Calculate age
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;
            // Save to backend if authenticated
            if (isAuthenticated) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].updateBirthYear(birthYear);
            }
            // Add to history
            const ageEntry = {
                expression: `Age from ${birthYear}`,
                result: age,
                actualResult: age,
                forcedResult: null,
                timestamp: new Date().toLocaleString(),
                forced: false,
                operationType: 'age_calculation',
                year: birthYear,
                age: age
            };
            handleAddToHistory(ageEntry);
            setShowBirthYearModal(false);
        } catch (error) {
            console.error('Failed to save birth year:', error);
        } finally{
            setBirthYearLoading(false);
        }
    };
    const handleClearHistory = async ()=>{
        setHistory([]);
        // Clear from backend if authenticated
        if (isAuthenticated) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].clearHistory(getDeviceId());
            } catch (error) {
                console.error('Failed to clear backend history:', error);
            }
        }
    };
    const handleSetForcedNumber = async (forcedNumbers)=>{
        setForcedNumber(forcedNumbers);
        setShowForcedModal(false);
        // Update backend if authenticated
        if (isAuthenticated) {
            try {
                await updateForcedNumber(forcedNumbers);
            } catch (error) {
                console.error('Failed to update forced numbers in backend:', error);
            }
        }
    };
    const handleClearForcedNumber = async ()=>{
        setForcedNumber({
            forcedNumber: null,
            secondForceNumber: null,
            secondForceTriggerNumber: null
        });
        // Update backend if authenticated
        if (isAuthenticated) {
            try {
                await updateForcedNumber({
                    forcedNumber: null,
                    secondForceNumber: null,
                    secondForceTriggerNumber: null
                });
            } catch (error) {
                console.error('Failed to clear forced numbers in backend:', error);
            }
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex items-center justify-center min-h-screen bg-black p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                        lineNumber: 278,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                lineNumber: 276,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
            lineNumber: 275,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$calculator$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onAddToHistory: handleAddToHistory,
                    onOpenHistory: ()=>setShowHistory(true),
                    onOpenForcedModal: ()=>setShowForcedModal(true),
                    forcedNumber: forcedNumber,
                    onClearForcedNumber: handleClearForcedNumber
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this),
                showHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$history$2d$panel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    history: history,
                    onClose: ()=>setShowHistory(false),
                    onClear: handleClearHistory
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 296,
                    columnNumber: 11
                }, this),
                showForcedModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$forced$2d$number$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    currentValue: forcedNumber,
                    onSave: handleSetForcedNumber,
                    onClose: ()=>setShowForcedModal(false)
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 304,
                    columnNumber: 11
                }, this),
                showBirthYearModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$birth$2d$year$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: showBirthYearModal,
                    onClose: ()=>setShowBirthYearModal(false),
                    onSubmit: handleBirthYearSubmit,
                    initialYear: user?.birthYear,
                    isLoading: birthYearLoading
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 312,
                    columnNumber: 11
                }, this),
                showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$auth$2d$modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onClose: ()=>setShowAuthModal(false)
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 322,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
            lineNumber: 286,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
_s(HomeWrapper, "Gzw/bmDp5XLnlULdP/pxvMfFNms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = HomeWrapper;
var _c;
__turbopack_context__.k.register(_c, "HomeWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/app/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SyntheticV0PageForDeployment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$home$2d$wrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/home-wrapper.jsx [app-client] (ecmascript)");
"use client";
;
;
function SyntheticV0PageForDeployment() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$home$2d$wrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/calculator-pwa/app/page.jsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = SyntheticV0PageForDeployment;
var _c;
__turbopack_context__.k.register(_c, "SyntheticV0PageForDeployment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=calculator-pwa_ca77442a._.js.map
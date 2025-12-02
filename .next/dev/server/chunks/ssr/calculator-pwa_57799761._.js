module.exports = [
"[project]/calculator-pwa/components/button.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
// Button Component
const Button = ({ variant = "gray", onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, label, className = "" })=>{
    const baseStyles = "flex items-center justify-center font-light rounded-full transition-all active:scale-95 select-none";
    const sizeStyles = "w-full aspect-square text-[32px]";
    const variants = {
        gray: "bg-[#505050] text-white active:bg-[#606060]",
        lightGray: "bg-[#D4D4D2] text-black active:bg-[#E5E5E3]",
        orange: "bg-[#FF9F0A] text-white active:bg-[#FFB340]"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onTouchStart: onTouchStart,
        onTouchEnd: onTouchEnd,
        className: `${baseStyles} ${sizeStyles} ${variants[variant]} ${className}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/button.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Button;
}),
"[project]/calculator-pwa/components/display.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Display = ({ value })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full px-6 pb-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-right text-white text-[80px] font-extralight leading-none tracking-tight",
            children: value
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/display.jsx",
            lineNumber: 4,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/display.jsx",
        lineNumber: 3,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Display;
}),
"[project]/calculator-pwa/components/calculator.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Calculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$display$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/display.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Calculator({ onAddToHistory, onOpenHistory, onOpenForcedModal, forcedNumber, onClearForcedNumber }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("0");
    const [previousValue, setPreviousValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [operation, setOperation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [waitingForNewValue, setWaitingForNewValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const longPressTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
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
        if (previousValue !== null && operation) {
            const currentValue = Number.parseFloat(display);
            const actualResult = performCalculation(previousValue, currentValue, operation);
            let forcedResult = null;
            let isForced = false;
            // Check if operation is addition or subtraction
            if (operation === '+' || operation === '-') {
                // Check for second force trigger first (higher priority)
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
    const handleBackspace = ()=>{
        if (display.length === 1) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-96 px-6 py-8 bg-black rounded-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$display$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                value: display
            }, void 0, false, {
                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-3 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleClear,
                        label: "AC"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleToggleSign,
                        label: "+/-"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleOperation("%"),
                        label: "%"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("÷"),
                        onMouseDown: handleDivisionStart,
                        onMouseUp: handleDivisionEnd,
                        onTouchStart: handleDivisionStart,
                        onTouchEnd: handleDivisionEnd,
                        label: "÷"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(7),
                        label: "7"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(8),
                        label: "8"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(9),
                        label: "9"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("×"),
                        onMouseDown: handleMultiplyStart,
                        onMouseUp: handleMultiplyEnd,
                        onTouchStart: handleMultiplyStart,
                        onTouchEnd: handleMultiplyEnd,
                        label: "×"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(4),
                        label: "4"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(5),
                        label: "5"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(6),
                        label: "6"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("-"),
                        label: "-"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(1),
                        label: "1"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(2),
                        label: "2"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(3),
                        label: "3"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: ()=>handleOperation("+"),
                        onMouseDown: handleAdditionStart,
                        onMouseUp: handleAdditionEnd,
                        onTouchStart: handleAdditionStart,
                        onTouchEnd: handleAdditionEnd,
                        label: "+"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleBackspace,
                        label: "⌫",
                        isIcon: true
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: ()=>handleNumberClick(0),
                        label: "0"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "gray",
                        onClick: handleDecimal,
                        label: "."
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "orange",
                        onClick: handleEquals,
                        label: "="
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/calculator.jsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/calculator.jsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calculator-pwa/components/calculator.jsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
}),
"[project]/calculator-pwa/components/history-panel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function HistoryPanel({ history, onClose, onClear }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-96 flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white",
                            children: "History"
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClear,
                            className: "text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded",
                            children: "Clear"
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto space-y-3",
                    children: history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-center py-8",
                        children: "No history yet"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                        lineNumber: 16,
                        columnNumber: 13
                    }, this) : history.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800 p-3 rounded",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-300 text-sm",
                                    children: entry.expression
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                    lineNumber: 20,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-amber-500 font-semibold mt-1",
                                    children: [
                                        "= ",
                                        entry.result,
                                        entry.forced && " (forced)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                    lineNumber: 21,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-500 text-xs mt-1",
                                    children: entry.timestamp
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                                    lineNumber: 25,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                            lineNumber: 19,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/history-panel.jsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/history-panel.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/history-panel.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/calculator-pwa/components/forced-number-modal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ForcedNumberModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ForcedNumberModal({ currentValue, onSave, onClose }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 rounded-lg p-6 w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-white mb-4",
                    children: "Forced Number Settings"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-300 text-sm font-medium mb-2",
                                    children: "Forcing Number"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-xs mb-2",
                                    children: "Shows for any addition/subtraction operation"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: formData.forcedNumber,
                                    onChange: (e)=>handleInputChange('forcedNumber', e.target.value),
                                    placeholder: "Enter forcing number",
                                    className: "w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-300 text-sm font-medium mb-2",
                                    children: "Second Force Number"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-xs mb-2",
                                    children: "Shows when trigger number is detected"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: formData.secondForceNumber,
                                    onChange: (e)=>handleInputChange('secondForceNumber', e.target.value),
                                    placeholder: "Enter second force number",
                                    className: "w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-300 text-sm font-medium mb-2",
                                    children: "Second Force Trigger Number"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-xs mb-2",
                                    children: "If this number appears in addition/subtraction, show second force number"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: formData.secondForceTriggerNumber,
                                    onChange: (e)=>handleInputChange('secondForceTriggerNumber', e.target.value),
                                    placeholder: "Enter trigger number",
                                    className: "w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg",
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/forced-number-modal.jsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/calculator-pwa/components/auth-modal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/contexts/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/button.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const { login, register, logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-6 w-96 max-w-full mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4 text-black",
                        children: "Account"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 text-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "orange",
                                onClick: handleLogout,
                                label: "Logout",
                                className: "flex-1 auth"
                            }, void 0, false, {
                                fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 w-96 max-w-full mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4 text-black",
                    children: isLogin ? "Login" : "Register"
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Username"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-700 text-sm font-bold mb-2",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/calculator-pwa/components/auth-modal.jsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-black",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/calculator-pwa/lib/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService
]);
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
class ApiService {
    constructor(){
        this.token = null;
        this.loadToken();
    }
    loadToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    saveToken(token) {
        this.token = token;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    removeToken() {
        this.token = null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
}),
"[project]/calculator-pwa/components/home-wrapper.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$calculator$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/calculator.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$history$2d$panel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/history-panel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$forced$2d$number$2d$modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/forced-number-modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$auth$2d$modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/auth-modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/contexts/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/lib/api.js [app-ssr] (ecmascript)");
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
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showForcedModal, setShowForcedModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [forcedNumber, setForcedNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [syncStatus, setSyncStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('offline');
    const { user, isAuthenticated, updateForcedNumber, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedHistory = localStorage.getItem("calculatorHistory");
        const savedForcedNumber = localStorage.getItem("forcedNumber");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
        if (savedForcedNumber) {
            setForcedNumber(JSON.parse(savedForcedNumber));
        }
        // Set forced number from user profile if authenticated
        if (isAuthenticated && user) {
            setForcedNumber({
                forcedNumber: user.forcedNumber,
                secondForceNumber: user.secondForceNumber,
                secondForceTriggerNumber: user.secondForceTriggerNumber
            });
        }
    }, [
        isAuthenticated,
        user,
        loading
    ]);
    // Save to localStorage whenever history changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("calculatorHistory", JSON.stringify(history));
    }, [
        history
    ]);
    // Save to localStorage whenever forcedNumber changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("forcedNumber", JSON.stringify(forcedNumber));
    }, [
        forcedNumber
    ]);
    // Sync with backend when online and authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAuthenticated && navigator.onLine && !loading) {
            syncWithBackend();
        }
    }, [
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].syncCalculations(calculationsToSync);
                // Mark as synced
                const updatedHistory = history.map((item)=>({
                        ...item,
                        synced: true
                    }));
                setHistory(updatedHistory);
            }
            // Load latest history from backend
            const backendHistory = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getHistory({
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
        // Save to backend if authenticated and it was a forced calculation
        if (isAuthenticated && entry.forced) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].saveCalculation({
                    expression: entry.expression,
                    actualResult: entry.result,
                    forcedResult: entry.result,
                    wasForced: entry.forced,
                    operationType: getOperationType(entry.expression),
                    deviceId: getDeviceId()
                });
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
    const handleClearHistory = async ()=>{
        setHistory([]);
        // Clear from backend if authenticated
        if (isAuthenticated) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].clearHistory(getDeviceId());
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex items-center justify-center min-h-screen bg-black p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                lineNumber: 205,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
            lineNumber: 204,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex items-center justify-center min-h-screen bg-black p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$calculator$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onAddToHistory: handleAddToHistory,
                    onOpenHistory: ()=>setShowHistory(true),
                    onOpenForcedModal: ()=>setShowForcedModal(true),
                    forcedNumber: forcedNumber,
                    onClearForcedNumber: handleClearForcedNumber
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                showHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$history$2d$panel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    history: history,
                    onClose: ()=>setShowHistory(false),
                    onClear: handleClearHistory
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 225,
                    columnNumber: 11
                }, this),
                showForcedModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$forced$2d$number$2d$modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    currentValue: forcedNumber,
                    onSave: handleSetForcedNumber,
                    onClose: ()=>setShowForcedModal(false)
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 233,
                    columnNumber: 11
                }, this),
                showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$auth$2d$modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onClose: ()=>setShowAuthModal(false)
                }, void 0, false, {
                    fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
                    lineNumber: 241,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
            lineNumber: 215,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/components/home-wrapper.jsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
}),
"[project]/calculator-pwa/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SyntheticV0PageForDeployment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$home$2d$wrapper$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/components/home-wrapper.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function SyntheticV0PageForDeployment() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$components$2f$home$2d$wrapper$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/calculator-pwa/app/page.jsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=calculator-pwa_57799761._.js.map
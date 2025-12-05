"use client"

import { useState, useRef } from "react"
import Button from "./button"
import Display from "./display"

export default function Calculator({
  onAddToHistory,
  onOpenHistory,
  onOpenForcedModal,
  forcedNumber,
  onClearForcedNumber,
}) {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const longPressTimerRef = useRef(null)

  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === "0" ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.")
      setWaitingForNewValue(false)
    } else if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleOperation = (op) => {
    const currentValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation && !waitingForNewValue) {
      const result = performCalculation(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (forcedNumber !== null) {
      const timestamp = new Date().toLocaleString()
      onAddToHistory({
        expression: `${previousValue} ${operation} ${display}`,
        result: forcedNumber,
        timestamp,
        forced: true,
      })
      setDisplay(String(forcedNumber))
      onClearForcedNumber()
    } else if (previousValue !== null && operation) {
      const currentValue = Number.parseFloat(display)
      const result = performCalculation(previousValue, currentValue, operation)
      const timestamp = new Date().toLocaleString()
      onAddToHistory({
        expression: `${previousValue} ${operation} ${display}`,
        result,
        timestamp,
        forced: false,
      })
      setDisplay(String(result))
    }

    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(true)
  }

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current
      case "-":
        return prev - current
      case "×":
        return prev * current
      case "÷":
        return prev / current
      case "%":
        return prev % current
      default:
        return current
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleToggleSign = () => {
    const currentValue = Number.parseFloat(display)
    setDisplay(String(currentValue * -1))
  }

  const handleDivideStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      onOpenForcedModal()
    }, 600)
  }

  const handleDivideEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
  }

  const handleMultiplyStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      onOpenHistory()
    }, 600)
  }

  const handleMultiplyEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
  }

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0")
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl px-3 sm:px-6 py-6 sm:py-8 bg-black rounded-2xl sm:rounded-3xl">
      <Display value={display} forcedNumber={forcedNumber} />

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
        {/* Row 1 */}
        <Button variant="gray" onClick={handleClear} label="AC" />
        <Button variant="gray" onClick={handleToggleSign} label="+/-" />
        <Button variant="gray" onClick={() => handleOperation("%")} label="%" />
        <Button
          variant="orange"
          onClick={() => handleOperation("÷")}
          onMouseDown={handleDivideStart}
          onMouseUp={handleDivideEnd}
          onTouchStart={handleDivideStart}
          onTouchEnd={handleDivideEnd}
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
        <Button variant="orange" onClick={() => handleOperation("-")} label="-" />

        {/* Row 4 */}
        <Button variant="gray" onClick={() => handleNumberClick(1)} label="1" />
        <Button variant="gray" onClick={() => handleNumberClick(2)} label="2" />
        <Button variant="gray" onClick={() => handleNumberClick(3)} label="3" />
        <Button variant="orange" onClick={() => handleOperation("+")} label="+" />

        {/* Row 5 */}
        <Button variant="gray" onClick={handleBackspace} label="✕" isIcon={true} shape="square" />
        <Button variant="gray" onClick={() => handleNumberClick(0)} label="0" />
        <Button variant="gray" onClick={handleDecimal} label="." />
        <Button variant="orange" onClick={handleEquals} label="=" />
      </div>
    </div>
  )
}

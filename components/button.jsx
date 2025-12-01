"use client"

export default function Button({
  variant = "gray",
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  label,
  className = "",
  isIcon = false,
  type = "button",
  disabled = false,
}) {
  const baseStyles = "flex items-center justify-center font-semibold rounded-lg transition-all active:scale-90 select-none user-select-none"
  
  // Calculator button styles (default)
  const calculatorStyles = "w-full aspect-square text-3xl shadow-lg"
  
  // Auth button styles
  const authStyles = "w-full px-4 py-2 text-base shadow-md"

  const variants = {
    gray: "bg-gray-500 text-white hover:bg-gray-600 active:brightness-75",
    orange: "bg-orange-500 text-white hover:bg-orange-600 active:brightness-75",
  }

  const buttonStyles = className.includes("auth") ? authStyles : calculatorStyles

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      disabled={disabled}
      className={`${baseStyles} ${buttonStyles} ${variants[variant]} ${className}`}
      aria-label={`Button ${label}`}
    >
      <span className={isIcon ? "text-2xl" : ""}>{label}</span>
    </button>
  )
}

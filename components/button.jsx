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
}) {
  const baseStyles =
    "flex items-center justify-center w-full aspect-square text-3xl font-semibold rounded-full transition-all active:scale-90 select-none user-select-none"

  const variants = {
    gray: "bg-gray-500 text-white hover:bg-gray-600 active:brightness-75 shadow-lg",
    orange: "bg-orange-500 text-white hover:bg-orange-600 active:brightness-75 shadow-lg",
  }

  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label={`Button ${label}`}
    >
      <span className={isIcon ? "text-2xl" : "text-3xl"}>{label}</span>
    </button>
  )
}

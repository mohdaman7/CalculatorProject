"use client"

// Button Component
const Button = ({ variant = "gray", onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, label, className = "" }) => {
  const baseStyles = "flex items-center justify-center font-light rounded-full transition-all active:scale-95 select-none";
  const sizeStyles = "w-full aspect-square text-[32px]";
  
  const variants = {
    gray: "bg-[#505050] text-white active:bg-[#606060]",
    lightGray: "bg-[#D4D4D2] text-black active:bg-[#E5E5E3]",
    orange: "bg-[#FF9F0A] text-white active:bg-[#FFB340]",
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
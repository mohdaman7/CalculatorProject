const Display = ({ value }) => {
  return (
    <div className="w-full px-6 pb-4">
      <div className="text-right text-white text-[80px] font-extralight leading-none tracking-tight">
        {value}
      </div>
    </div>
  );
};

export default Display;
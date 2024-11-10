import React from "react";

const Input = ({
  icon: Icon,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="z-1 relative mb-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {Icon}
      </div>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-[40px] focus:outline-none"
      />
    </div>
  );
};

export default Input;

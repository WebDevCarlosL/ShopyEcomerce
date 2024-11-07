import React from "react";

const Input = ({
  icon: Icon,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  htmlfor,
  label,
}) => {
  return (
    <div className="mt-2 flex flex-col gap-1">
      <label className="text-xs text-gray-500" htmlFor={htmlfor}>
        {label}
        <span className="text-red-500">*</span>
      </label>
      <div className="relative mb-2">
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
          className="w-full rounded-lg border py-2 pl-10 outline-none"
        />
      </div>
    </div>
  );
};

export default Input;

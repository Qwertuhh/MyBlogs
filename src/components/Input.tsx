import React, { forwardRef, useId } from "react";

const Input = forwardRef(function (
  {
    label,
    type = "text",
    className = "",
    ...props
  }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...props}
        ref={ref}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
      />
    </div>
  );
});
export default Input;

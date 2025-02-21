import React from "react";
import { useId, ComponentPropsWithRef } from "react";

type SelectProps = ComponentPropsWithRef<"select"> & {
  options: string[];
  label: string;
  className?: string;
};
function Select(
  {
    options,
    label,
    className = "",
    ...props
  }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        ></label>
      )}
      <select
        {...props}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);

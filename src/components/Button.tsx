import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-red-500",
  textColor = "text-white",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <button
      {...props}
      type={type}
      className={`px-4 py-2 ${bgColor} ${textColor} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

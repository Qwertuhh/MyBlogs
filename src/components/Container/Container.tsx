import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full mx-auto px-4">{children}</div>;
}

export default Container;

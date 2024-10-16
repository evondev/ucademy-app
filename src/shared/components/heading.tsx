import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}
const Heading = ({ children, className = "" }: HeadingProps) => {
  return (
    <h1 className={cn("font-bold text-2xl lg:text-3xl", className)}>
      {children}
    </h1>
  );
};

export default Heading;

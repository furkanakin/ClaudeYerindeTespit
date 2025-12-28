"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#8CC63F] text-white hover:bg-[#7ab233] shadow-lg hover:shadow-xl":
              variant === "primary",
            "bg-[#2C3E50] text-white hover:bg-[#34495E]":
              variant === "secondary",
            "border-2 border-[#8CC63F] text-[#8CC63F] hover:bg-[#8CC63F] hover:text-white":
              variant === "outline",
            "text-[#8CC63F] hover:bg-[#8CC63F]/10": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

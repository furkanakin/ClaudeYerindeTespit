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
          "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-lg hover:shadow-xl":
              variant === "primary",
            "bg-[#111827] text-white hover:bg-[#1F2937]":
              variant === "secondary",
            "border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white":
              variant === "outline",
            "text-[#0D9488] hover:bg-[#0D9488]/10": variant === "ghost",
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

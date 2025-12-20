"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  lightText?: boolean;
}

export default function Logo({ className, showText = true, size = "md", lightText = false }: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-10 h-10", text: "text-xl" },
    lg: { icon: "w-12 h-12", text: "text-2xl" },
  };

  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      {/* House Icon */}
      <div className={cn("relative", sizes[size].icon)}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* House shape */}
          <path
            d="M20 4L4 16V36H16V24H24V36H36V16L20 4Z"
            fill="#0D9488"
            className="transition-colors group-hover:fill-[#0F766E]"
          />
          {/* Roof accent */}
          <path
            d="M20 4L4 16H8L20 7L32 16H36L20 4Z"
            fill="#0F766E"
          />
          {/* Window */}
          <rect x="17" y="18" width="6" height="6" rx="1" fill="white" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-bold text-[#0D9488] italic",
              sizes[size].text
            )}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            yerinde
          </span>
          <span
            className={cn(
              "font-semibold -mt-1",
              lightText ? "text-white" : "text-[#111827]",
              size === "sm" ? "text-base" : size === "md" ? "text-lg" : "text-xl"
            )}
          >
            analiz
          </span>
        </div>
      )}
    </Link>
  );
}

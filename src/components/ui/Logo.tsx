"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  lightText?: boolean;
}

export default function Logo({ className, size = "md", lightText }: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 40 },
    md: { width: 100, height: 50 },
    lg: { width: 140, height: 70 },
  };

  return (
    <Link href="/" className={cn("flex items-center group", className)}>
      <Image
        src="/images/logo-transparent.png"
        alt="Yerinde Analiz Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className={cn(
          "object-contain transition-all duration-300",
          lightText && "brightness-0 invert active:brightness-0 active:invert"
        )}
        priority
      />
    </Link>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  lightText?: boolean; // Kept for compatibility
  showText?: boolean;  // Kept for compatibility
}

export default function Logo({ className, size = "md", lightText, showText }: LogoProps) {
  const sizes = {
    sm: { width: 140, height: 40 },
    md: { width: 180, height: 50 },
    lg: { width: 220, height: 60 },
  };

  return (
    <Link href="/" className={cn("flex items-center group", className)}>
      <Image
        src="/images/logo-label.png"
        alt="Yerinde Analiz Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
        priority
      />
    </Link>
  );
}

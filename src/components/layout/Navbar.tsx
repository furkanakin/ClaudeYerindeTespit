"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/paketler", label: "Paketler" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <Logo size="md" lightText={!isScrolled && isHomePage} />
              <span
                className={cn(
                  "hidden md:block text-sm font-medium transition-colors",
                  isScrolled || !isHomePage ? "text-[#6B7280]" : "text-white/80"
                )}
              >
                Stratejik Danışmanlık
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    isScrolled || !isHomePage
                      ? "text-[#111827] hover:text-[#0D9488]"
                      : "text-white hover:text-white/80",
                    pathname === link.href && "text-[#0D9488]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-[#0D9488] transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled || !isHomePage
                  ? "text-[#111827] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                          pathname === link.href
                            ? "bg-[#0D9488]/10 text-[#0D9488]"
                            : "text-[#111827] hover:bg-gray-100"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

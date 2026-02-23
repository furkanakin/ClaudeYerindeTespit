"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { getNavLinksForLocale, switchLocalePath, getLocalizedPath } from "@/lib/i18n/routes";

const menuTranslations: Record<string, Record<string, string>> = {
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    packages: "Paketler",
    faq: "S.S.S.",
    contact: "İletişim",
    tagline: "Stratejik Danışmanlık"
  },
  en: {
    home: "Home",
    about: "About Us",
    packages: "Packages",
    faq: "FAQ",
    contact: "Contact",
    tagline: "Strategic Consulting"
  }
};

export default function Navbar({ locale = "tr", translations = {} }: { locale?: string, translations?: Record<string, string> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = getNavLinksForLocale(locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (key: string) => translations[key] || menuTranslations[locale]?.[key] || key;

  // Check if current page is homepage
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // Get language switch URL (converts path to target locale)
  const getLanguageSwitchHref = (targetLocale: string) => {
    return switchLocalePath(pathname, locale, targetLocale);
  };

  // Check if a link is active
  const isLinkActive = (href: string, internalPath: string) => {
    if (internalPath === '/') {
      return isHomePage;
    }
    // Check both the SEO path and internal path
    return pathname === href || pathname === `/${locale}${internalPath}`;
  };

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
              <Link href={getLocalizedPath('/', locale)}>
                <Logo size="md" lightText={!isScrolled && isHomePage} />
              </Link>
              <span
                className={cn(
                  "hidden md:block text-sm font-medium transition-colors",
                  isScrolled || !isHomePage ? "text-[#6B7280]" : "text-white/80"
                )}
              >
                {t("tagline")}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href, link.internalPath);

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "text-base font-bold transition-all duration-300 relative group",
                      isScrolled || !isHomePage
                        ? "text-[#2C3E50] hover:text-[#8CC63F]"
                        : "text-white hover:text-white/80",
                      isActive && "text-[#8CC63F]"
                    )}
                  >
                    {t(link.key)}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[#8CC63F] transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                );
              })}

              {/* Language Switcher */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <Link
                  href={getLanguageSwitchHref("tr")}
                  className={cn(
                    "text-sm font-bold transition-colors",
                    locale === "tr" ? "text-[#8CC63F]" : (isScrolled || !isHomePage ? "text-gray-400" : "text-white/60")
                  )}
                >
                  TR
                </Link>
                <span className={isScrolled || !isHomePage ? "text-gray-300" : "text-white/20"}>|</span>
                <Link
                  href={getLanguageSwitchHref("en")}
                  className={cn(
                    "text-sm font-bold transition-colors",
                    locale === "en" ? "text-[#8CC63F]" : (isScrolled || !isHomePage ? "text-gray-400" : "text-white/60")
                  )}
                >
                  EN
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled || !isHomePage
                  ? "text-[#2C3E50] hover:bg-gray-100"
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
                <div className="flex justify-between items-center mb-8">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-[#2C3E50]" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => {
                    const isActive = isLinkActive(link.href, link.internalPath);

                    return (
                      <Link
                        key={link.key}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          isActive
                            ? "bg-[#8CC63F]/10 text-[#8CC63F]"
                            : "text-[#2C3E50] hover:bg-gray-100"
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Language Switcher */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 px-4">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Dil:</span>
                    <Link
                      href={getLanguageSwitchHref("tr")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-3 py-1 rounded text-sm font-medium",
                        locale === "tr"
                          ? "bg-[#8CC63F] text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      TR
                    </Link>
                    <Link
                      href={getLanguageSwitchHref("en")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-3 py-1 rounded text-sm font-medium",
                        locale === "en"
                          ? "bg-[#8CC63F] text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      EN
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

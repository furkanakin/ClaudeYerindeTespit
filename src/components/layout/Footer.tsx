"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Mail, MapPin } from "lucide-react";
import { getLocalizedPath } from "@/lib/i18n/routes";

interface FooterProps {
  locale?: string;
}

const footerTranslations: Record<string, Record<string, string>> = {
  tr: {
    description: "Yerinde Analiz, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformudur. Gayrimenkul kararlarınızda güvenilir yol arkadaşınız.",
    tagline: "Doğru bilgi → Bilinçli değerlendirme → İsabetli karar",
    quickLinks: "Hızlı Erişim",
    contact: "İletişim",
    rights: "Tüm Hakları Saklıdır",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    about: "Hakkımızda",
    packages: "Paketler",
    faq: "Sıkça Sorulan Sorular",
    contracts: "Sözleşmeler"
  },
  en: {
    description: "On-Site Analysis is a consulting platform providing independent and unbiased information services. Your reliable partner in real estate decisions.",
    tagline: "Accurate info → Informed evaluation → Right decision",
    quickLinks: "Quick Access",
    contact: "Contact",
    rights: "All Rights Reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    about: "About Us",
    packages: "Packages",
    faq: "FAQ",
    contracts: "Contracts"
  }
};

export default function Footer({ locale = "tr" }: FooterProps) {
  const t = (key: string) => footerTranslations[locale]?.[key] || footerTranslations.tr[key] || key;

  const quickLinks = [
    { internalPath: "/hakkimizda", label: t("about") },
    { internalPath: "/paketler", label: t("packages") },
    { internalPath: "/sss", label: t("faq") },
    { internalPath: "/iletisim", label: t("contact") },
  ];

  return (
    <footer className="bg-[#2C3E50] text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href={getLocalizedPath("/", locale)}>
              <Logo size="lg" lightText className="mb-6" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {t("description")}
            </p>
            <p
              className="text-[#8CC63F] font-bold italic"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.internalPath}>
                  <Link
                    href={getLocalizedPath(link.internalPath, locale)}
                    className="text-gray-400 hover:text-[#8CC63F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("contact")}</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@yerindeanaliz.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#8CC63F] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#8CC63F]" />
                  info@yerindeanaliz.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#8CC63F] flex-shrink-0 mt-0.5" />
                <span>Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Yerinde Analiz - {t("rights")}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
              <Link href={getLocalizedPath("/aydinlatma", locale)} className="hover:text-[#8CC63F] transition-colors">
                {locale === "en" ? "Privacy Notice" : "KVKK Aydınlatma"}
              </Link>
              <Link href={getLocalizedPath("/cerez-aydinlatma", locale)} className="hover:text-[#8CC63F] transition-colors">
                {locale === "en" ? "Cookie Policy" : "Çerez Politikası"}
              </Link>
              <Link href={getLocalizedPath("/kullanim-kosullari", locale)} className="hover:text-[#8CC63F] transition-colors">
                {t("terms")}
              </Link>
              <Link href={getLocalizedPath("/ilgili-kisi-basvuru", locale)} className="hover:text-[#8CC63F] transition-colors">
                {locale === "en" ? "Data Subject" : "İlgili Kişi Başvuru"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

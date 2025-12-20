"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/paketler", label: "Paketler" },
  { href: "/sss", label: "Sıkça Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Logo size="lg" lightText className="mb-6" />
            <p className="text-gray-400 mb-6 max-w-md">
              Yerinde Analiz, bağımsız ve tarafsız bilgi hizmeti sunan bir
              danışmanlık platformudur. Gayrimenkul kararlarınızda güvenilir
              yol arkadaşınız.
            </p>
            <p
              className="text-[#0D9488] font-medium italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Doğru bilgi → Bilinçli değerlendirme → İsabetli karar
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#0D9488] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@yerindeanaliz.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#0D9488] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#0D9488]" />
                  info@yerindeanaliz.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#0D9488]" />
                Muğla, Türkiye
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Yerinde Analiz - Tüm Hakları Saklıdır
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/gizlilik" className="hover:text-[#0D9488] transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-[#0D9488] transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Shield, Target } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/LanguageContext";

// Fallback translations
const fallbackTranslations: Record<string, Record<string, string>> = {
  tr: {
    whyus_title_prefix: "Neden",
    whyus_title_highlight: "Yerinde Analiz",
    whyus_item1_title: "Gerçek Durum",
    whyus_item1_subtitle: "Gayrimenkulün gerçek durumunu ortaya çıkarır.",
    whyus_item1_desc: "Arazi veya konutun fiziksel, teknik ve planlama açısından tüm kritik detaylarını yerinde inceleme ve masaüstü araştırmayla görünür kılar.",
    whyus_item2_title: "Koruma",
    whyus_item2_subtitle: "Yanlış bir kararı en başında önler.",
    whyus_item2_desc: "Erken tespit edilen risklerle olası maddi ve zamansal kayıpları engeller; arazi ya da konut alım sürecinizde güvenli bir zemin sağlar.",
    whyus_item3_title: "Netlik",
    whyus_item3_subtitle: "Tarafsız ve anlaşılır bir karar çerçevesi sunar.",
    whyus_item3_desc: "Yönlendirme yapmadan, sade ve objektif bilgilerle size en uygun araziyi veya konutu seçmenizi kolaylaştırır.",
  },
  en: {
    whyus_title_prefix: "Why",
    whyus_title_highlight: "Yerinde Analiz",
    whyus_item1_title: "Real Situation",
    whyus_item1_subtitle: "Reveals the real condition of the property.",
    whyus_item1_desc: "Makes visible all critical details of land or housing in terms of physical, technical and planning aspects through on-site inspection and desktop research.",
    whyus_item2_title: "Protection",
    whyus_item2_subtitle: "Prevents a wrong decision from the start.",
    whyus_item2_desc: "Prevents possible financial and time losses with early detected risks; provides a safe ground in your land or housing purchase process.",
    whyus_item3_title: "Clarity",
    whyus_item3_subtitle: "Offers an impartial and understandable decision framework.",
    whyus_item3_desc: "Without directing, it makes it easier for you to choose the most suitable land or housing with simple and objective information.",
  },
};

export default function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, translations } = useTranslation();

  const t = (key: string) => {
    if (translations[key]) return translations[key];
    if (fallbackTranslations[locale]?.[key]) return fallbackTranslations[locale][key];
    return fallbackTranslations.tr[key] || key;
  };

  const whyUsItems = [
    {
      icon: Search,
      titleKey: "whyus_item1_title",
      subtitleKey: "whyus_item1_subtitle",
      descKey: "whyus_item1_desc",
      image: "/images/gercek-durum.png",
    },
    {
      icon: Shield,
      titleKey: "whyus_item2_title",
      subtitleKey: "whyus_item2_subtitle",
      descKey: "whyus_item2_desc",
      image: "/images/koruma.png",
    },
    {
      icon: Target,
      titleKey: "whyus_item3_title",
      subtitleKey: "whyus_item3_subtitle",
      descKey: "whyus_item3_desc",
      image: "/images/netlik.png",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230D9488' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            {t("whyus_title_prefix")}{" "}
            <span className="text-[#8CC63F]">{t("whyus_title_highlight")}</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="h-full bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 text-[#8CC63F]">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-[#8CC63F] font-medium mb-4">{t(item.subtitleKey)}</p>
                  <p className="text-[#6B7280] leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

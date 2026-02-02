"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/lib/LanguageContext";

// Fallback translations
const fallbackTranslations: Record<string, Record<string, string>> = {
  tr: {
    manifesto_brand: "Yerinde Analiz",
    manifesto_text1: ", yatırım sürecinizde uzun vadeli hedeflerinize en uygun yolu belirlemenize yardımcı olan, riskleri azaltan ve doğru kararları destekleyen profesyonel bir yönlendirme hizmetidir.",
    manifesto_highlight: "Arazi, konut veya proje seçimlerinde",
    manifesto_text2: " mevcut durumun analizini yapar ve size özel bir yol haritası sunar.",
  },
  en: {
    manifesto_brand: "Yerinde Analiz",
    manifesto_text1: " is a professional guidance service that helps you determine the most suitable path for your long-term goals in your investment process, reduces risks, and supports correct decisions.",
    manifesto_highlight: "In land, housing, or project selections",
    manifesto_text2: " it analyzes the current situation and offers you a customized roadmap.",
  },
};

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, translations } = useTranslation();

  const t = (key: string) => {
    if (translations[key]) return translations[key];
    if (fallbackTranslations[locale]?.[key]) return fallbackTranslations[locale][key];
    return fallbackTranslations.tr[key] || key;
  };

  return (
    <section
      id="manifesto"
      ref={ref}
      className="py-20 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
            <span className="font-semibold">{t("manifesto_brand")}</span>
            {t("manifesto_text1")} <br />
            <span className="font-semibold">
              {t("manifesto_highlight")}
            </span>
            {t("manifesto_text2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

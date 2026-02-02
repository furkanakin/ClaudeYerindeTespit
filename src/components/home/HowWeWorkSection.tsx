"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, MapPin, FileText } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

// Fallback translations
const fallbackTranslations: Record<string, Record<string, string>> = {
  tr: {
    howwework_title_prefix: "Nasıl",
    howwework_title_highlight: "Çalışıyoruz",
    howwework_subtitle: "Üç adımdan oluşan süreçte alanında uzman mimar ve mühendislerden oluşan ekibimiz titizlikle çalışıyor ve raporunuzu seçtiğiniz pakette belirtilen süreye göre teslim ediyoruz.",
    howwework_step1_title: "Talep ve Kısa Görüşme",
    howwework_step1_desc: "İletişim formu üzerinden ilettiğiniz talebe yönelik ihtiyacınız belirlenir. Gerekirse kısa bir görüşme yapılır. Sonrasında teklifiniz ve hizmet sözleşmesi onayınıza sunulur.",
    howwework_step2_title: "Analiz ve Yerinde İnceleme",
    howwework_step2_desc: "Ödeme ve sözleşme onayı sonrasında ön analiz verileri toplanır. Bu verilerle saha ziyaretini gerçekleştirerek ihtiyaca yönelik yerinde mimari ve teknik incelemeler yapılır.",
    howwework_step3_title: "Rapor ve Online Görüşme",
    howwework_step3_desc: "Tüm bulgular yazılı ve görsel olarak raporlanıp tarafınıza dijital olarak iletilir. Paketinizin içeriğine göre raporunuz hakkında online görüşme yapılır.",
  },
  en: {
    howwework_title_prefix: "How Do We",
    howwework_title_highlight: "Work",
    howwework_subtitle: "In a three-step process, our team of expert architects and engineers works meticulously and delivers your report according to the time specified in your chosen package.",
    howwework_step1_title: "Request and Brief Meeting",
    howwework_step1_desc: "Your needs are determined based on the request you submit through the contact form. A brief meeting is held if necessary. Then your offer and service agreement are submitted for your approval.",
    howwework_step2_title: "Analysis and On-Site Inspection",
    howwework_step2_desc: "After payment and contract approval, preliminary analysis data is collected. With this data, site visit is made and on-site architectural and technical inspections are carried out according to needs.",
    howwework_step3_title: "Report and Online Meeting",
    howwework_step3_desc: "All findings are reported in written and visual form and delivered to you digitally. An online meeting is held about your report according to the content of your package.",
  },
};

export default function HowWeWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, t: contextT } = useTranslation();

  const t = (key: string) => {
    const fromDb = contextT(key);
    if (fromDb !== key) return fromDb;
    return fallbackTranslations[locale]?.[key] || fallbackTranslations.tr[key] || key;
  };

  const steps = [
    {
      step: 1,
      icon: MessageSquare,
      titleKey: "howwework_step1_title",
      descKey: "howwework_step1_desc",
    },
    {
      step: 2,
      icon: MapPin,
      titleKey: "howwework_step2_title",
      descKey: "howwework_step2_desc",
    },
    {
      step: 3,
      icon: FileText,
      titleKey: "howwework_step3_title",
      descKey: "howwework_step3_desc",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            {t("howwework_title_prefix")} <span className="text-[#8CC63F]">{t("howwework_title_highlight")}</span>?
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            {t("howwework_subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-[#8CC63F]/20 via-[#8CC63F] to-[#8CC63F]/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#8CC63F] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 10px 25px rgba(13, 148, 136, 0.3)' }}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#2C3E50] text-white text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

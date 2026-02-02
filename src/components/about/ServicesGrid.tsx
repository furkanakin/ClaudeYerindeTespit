"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileSearch, Building2, Shield, Hammer } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ServicesGridProps {
  locale?: string;
  translations?: Record<string, string>;
}

const servicesTR = [
  {
    icon: FileSearch,
    title: "İmar, Planlama ve Bilgi Kontrolü",
    description:
      "Parselin imar durumu, kullanım hakları, kısıtlamalar, çekme mesafeleri, yapılaşma koşulları ve resmi süreçlerle ilgili kritik bilgileri net ve anlaşılır şekilde ortaya koyuyoruz.",
    highlight: "Karar aşamasında sürprizlerin önüne geçiyoruz.",
  },
  {
    icon: Building2,
    title: "Yerinde Mimari ve Teknik İnceleme",
    description:
      "Arazinin veya yapının fiziksel durumunu, teknik risklerini, erişim ve altyapı koşullarını yerinde değerlendiriyoruz.",
    highlight:
      "Yapının mevcut durumu ile çevresel koşullar ve olası riskler, yerinde yapılan profesyonel incelemelerle analiz edilir.",
  },
  {
    icon: Shield,
    title: "Kapsamlı Bilgi Toplama ve Tarafsız Raporlama",
    description:
      "Sahadaki bulguları, fiziki koşulları, imar verilerini ve çevresel faktörleri bir araya getirerek bütüncül bir analiz oluşturuyoruz.",
    highlight:
      "Kararınızı özgürce verebilmeniz için tarafsız bilgi sağlıyoruz.",
  },
  {
    icon: Hammer,
    title: "Proje, Tadilat ve Uygulama Danışmanlığı",
    description:
      "İhtiyaç halinde mimari proje çizimi, mevcut yapıda yapılacak değişikliklerin planlanması ve uygulama süreçlerinin yönetimi gibi teknik hizmetlerle süreci bütünsel olarak destekliyoruz.",
    highlight: "",
  },
];

const servicesEN = [
  {
    icon: FileSearch,
    title: "Zoning, Planning and Information Control",
    description:
      "We reveal critical information about the parcel's zoning status, use rights, restrictions, setback distances, construction conditions, and official processes in a clear and understandable manner.",
    highlight: "We prevent surprises at the decision stage.",
  },
  {
    icon: Building2,
    title: "On-Site Architectural and Technical Inspection",
    description:
      "We evaluate the physical condition of the land or building, its technical risks, access, and infrastructure conditions on-site.",
    highlight:
      "The current state of the building, environmental conditions, and possible risks are analyzed through professional on-site inspections.",
  },
  {
    icon: Shield,
    title: "Comprehensive Information Collection and Impartial Reporting",
    description:
      "We create a holistic analysis by combining on-site findings, physical conditions, zoning data, and environmental factors.",
    highlight: "We provide impartial information so you can make your decision freely.",
  },
  {
    icon: Hammer,
    title: "Project, Renovation and Application Consulting",
    description:
      "If needed, we support the process holistically with technical services such as architectural project drawing, planning changes in the existing structure, and managing application processes.",
    highlight: "",
  },
];

export default function ServicesGrid({ locale = "tr", translations = {} }: ServicesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const t = (key: string, fallback: string) => translations[key] || fallback;
  const services = locale === "en" ? servicesEN : servicesTR;

  const sectionTitle = locale === "en" ? "What We Do?" : "Neler Yapıyoruz?";
  const ctaText = locale === "en" ? "Review Packages" : "Paketleri İnceleyin";

  return (
    <section ref={ref} className="py-24 bg-[#F9FAFB]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            {locale === "en" ? (
              <>What We <span className="text-[#8CC63F]">Do</span>?</>
            ) : (
              <>Neler <span className="text-[#8CC63F]">Yapıyoruz</span>?</>
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="h-full p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-[#8CC63F]/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#8CC63F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed mb-3">
                    {service.description}
                  </p>
                  {service.highlight && (
                    <p className="text-[#8CC63F] font-medium">
                      {service.highlight}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href={`/${locale}/paketler`}>
            <Button size="lg">{t("cta_packages", ctaText)}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

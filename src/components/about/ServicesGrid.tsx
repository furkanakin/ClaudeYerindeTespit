"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileSearch, Building2, Shield, Hammer } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

const services = [
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
      "Zemin, eğim, yapı durumu, çevresel etkenler ve olası problemler profesyonel yöntemlerle inceleniyor.",
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

export default function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#F9FAFB]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Neler <span className="text-[#0D9488]">Yapıyoruz</span>?
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
              <Card className="h-full p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed mb-3">
                      {service.description}
                    </p>
                    {service.highlight && (
                      <p className="text-[#0D9488] font-medium">
                        {service.highlight}
                      </p>
                    )}
                  </div>
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
          <Link href="/paketler">
            <Button size="lg">Paketleri İncele</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

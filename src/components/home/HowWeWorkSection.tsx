"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, MapPin, FileText } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Talep ve Kısa Görüşme",
    description:
      "İletişim formu üzerinden ilettiğiniz talebe yönelik ihtiyacınız belirlenir. Gerekirse kısa bir görüşme yapılır. Sonrasında teklifiniz ve hizmet sözleşmesi onayınıza sunulur.",
  },
  {
    step: 2,
    icon: MapPin,
    title: "Analiz ve Yerinde İnceleme",
    description:
      "Ödeme ve sözleşme onayı sonrasında ön analiz verileri toplanır. Bu verilerle saha ziyaretini gerçekleştirerek ihtiyaca yönelik yerinde mimari ve teknik incelemeler yapılır.",
  },
  {
    step: 3,
    icon: FileText,
    title: "Rapor ve Online Görüşme",
    description:
      "Tüm bulgular yazılı ve görsel olarak raporlanıp tarafınıza dijital olarak iletilir. Paketinizin içeriğine göre raporunuz hakkında online görüşme yapılır.",
  },
];

export default function HowWeWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Nasıl <span className="text-[#8CC63F]">Çalışıyoruz</span>?
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Üç adımdan oluşan süreçte alanında uzman mimar ve mühendislerden
            oluşan ekibimiz titizlikle çalışıyor ve raporunuzu seçtiğiniz pakette
            belirtilen süreye göre teslim ediyoruz.
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
                    {item.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {item.description}
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

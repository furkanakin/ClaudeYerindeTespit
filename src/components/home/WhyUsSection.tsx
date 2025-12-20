"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Shield, Target } from "lucide-react";

const whyUsItems = [
  {
    icon: Search,
    title: "Gerçek Durum",
    subtitle: "Gayrimenkulün gerçek durumunu ortaya çıkarır.",
    description:
      "Arazi veya konutun fiziksel, teknik ve planlama açısından tüm kritik detaylarını yerinde inceleme ve masaüstü araştırmayla görünür kılar.",
  },
  {
    icon: Shield,
    title: "Koruma",
    subtitle: "Yanlış bir kararı en başında önler.",
    description:
      "Erken tespit edilen risklerle olası maddi ve zamansal kayıpları engeller; arazi ya da konut alım sürecinizde güvenli bir zemin sağlar.",
  },
  {
    icon: Target,
    title: "Netlik",
    subtitle: "Tarafsız ve anlaşılır bir karar çerçevesi sunar.",
    description:
      "Yönlendirme yapmadan, sade ve objektif bilgilerle size en uygun araziyi veya konutu seçmenizi kolaylaştırır.",
  },
];

export default function WhyUsSection() {
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
            Neden{" "}
            <span className="text-[#0D9488]">Yerinde Analiz</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="h-full text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#0D9488] font-medium mb-4">{item.subtitle}</p>
                <p className="text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

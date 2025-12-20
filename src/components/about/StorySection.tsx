"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Building, Users } from "lucide-react";

export default function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Gradient Card with Icons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488] via-[#0f766e] to-[#111827]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Muğla</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <Building className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Mimarlık</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <Users className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Mühendislik</span>
                </div>
              </div>
              <p
                className="text-2xl md:text-3xl font-semibold text-center italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Doğru bilgi ile doğru karar"
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-8">
              Hikayemiz
            </h2>

            <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                Uzun yıllar mimarlık ve mühendislik alanlarında edindiğimiz
                deneyimin ardından İstanbul'dan Muğla'ya taşındık. Kendi yer
                arayışımız ve çevremize verdiğimiz destekler sırasında, pek çok
                kişinin güvenilir ve tarafsız bilgiye ulaşmakta zorlandığını fark
                ettik.
              </p>
              <p className="text-[#0D9488] font-semibold text-lg">
                Yerinde Analiz, bu ihtiyaçtan doğdu.
              </p>
              <p>
                Bir bölgeyi, yapıyı ya da arsayı; mimari, kentsel, çevresel,
                teknik ve hukuki yönleriyle bütüncül biçimde inceliyor, elde
                edilen verileri anlaşılır ve yol gösterici raporlara
                dönüştürüyoruz. Amacımız ne yapılması gerektiğini söylemek değil,
                doğru kararı verebilmek için sağlam bir bilgi zemini sunmak.
              </p>
              <p>
                Satın alma, yatırım, yerleşme ya da yenileme süreçlerinde ihtiyaç
                duyulan bilgileri açık ve uygulanabilir şekilde aktarırken, talep
                eden kullanıcılar için mimari ve mühendislik hizmetleriyle süreci
                bütünsel olarak destekleyebiliyoruz.
              </p>
            </div>

            {/* Slogan */}
            <div className="mt-10 p-6 bg-[#F9FAFB] rounded-2xl border-l-4 border-[#0D9488]">
              <p
                className="text-xl md:text-2xl font-semibold text-[#111827]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Doğru bilgi → Bilinçli değerlendirme → İsabetli karar
              </p>
              <p className="text-[#6B7280] mt-2">
                Yerinde Analiz, bağımsız ve tarafsız bilgi hizmeti sunan bir
                danışmanlık platformudur.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

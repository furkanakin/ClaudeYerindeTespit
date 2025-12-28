"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Image with Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
              alt="Modern mimari konut"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 via-transparent to-transparent" />
            {/* Quote at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p
                className="text-2xl md:text-3xl font-bold text-center italic"
                style={{ fontFamily: 'var(--font-family-display)' }}
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-8">
              Hikayemiz
            </h2>

            <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                Uzun yıllar boyunca mimarlık ve mühendislik alanlarında edindiğimiz profesyonel deneyimin ardından İstanbul’dan Muğla’ya taşındık. Hem kendi yer arayışımızda hem de çevremize destek verdiğimiz dönemlerde fark ettik ki, birçok kişi çoğu zaman güvenilir bilgiye, tarafsız değerlendirmeye ve profesyonel bakış açısına ulaşmakta zorlanıyor.
              </p>
              <p className="text-[#8CC63F] font-semibold text-lg">
                <span className="font-bold">Yerinde Analiz</span>, tam da bu ihtiyaçtan doğdu.
              </p>
              <p>
                Bir bölgenin, yapının veya arsanın görünen ve görünmeyen tüm yönlerini titizlikle inceliyoruz. Mimari, kentsel, çevresel, teknik ve hukuki pek çok veriyi bir araya getirerek anlaşılır ve yol gösterici raporlara dönüştüren bir danışmanlık hizmeti sunuyoruz.
              </p>
              <p>
                Amacımız, gayrimenkul kararlarında kişiye “ne yapması gerektiğini söylemek” değil, kişinin <span className="font-bold">en doğru kararı verebilmesi için sağlam bir bilgi zemini oluşturmaktır.</span> Böylece satın alma, yatırım, yerleşme ya da yenileme kararlarında ihtiyaç duyulan bilgileri kapsamlı, anlaşılır ve uygulanabilir biçimde aktarıyoruz.
              </p>
              <p>
                <span className="font-bold">Yerinde Analiz</span> danışmanlık hizmetleriyle “bilgiye ulaşmak zor” algısını değiştirerek herkes için güvenilir, profesyonel ve erişilebilir bir yol arkadaşlığı sunuyoruz.
              </p>
              <p>
                Tüm bu analitik sürecin yanı sıra, ihtiyaç duyan kullanıcılar için mimari tasarım, uygulama ve mühendislik hizmetleriyle de süreci bütünsel olarak destekleyebiliyoruz.
              </p>
              <p className="text-[#2C3E50] font-bold">
                Yerinde Analiz, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformudur.
              </p>
            </div>

            {/* Slogan */}
            <div className="mt-10 p-6 bg-[#F9FAFB] rounded-2xl border-l-4 border-[#8CC63F]">
              <p
                className="text-xl md:text-2xl font-semibold text-[#2C3E50]"
              >
                Doğru bilgi → Bilinçli değerlendirme → İsabetli karar
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

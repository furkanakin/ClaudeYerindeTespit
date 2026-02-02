"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface StorySectionProps {
  locale?: string;
  translations?: Record<string, string>;
}

export default function StorySection({ locale = "tr", translations = {} }: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const t = (key: string, fallback: string) => translations[key] || fallback;

  // Fallback contents for Turkish
  const trContent = (
    <>
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
    </>
  );

  // Fallback contents for English
  const enContent = (
    <>
      <p>
        After years of professional experience in architecture and engineering, we moved from Istanbul to Muğla. During our own search for property and times we supported those around us, we realized that many people often struggle to access reliable information, impartial evaluation, and a professional perspective.
      </p>
      <p className="text-[#8CC63F] font-semibold text-lg">
        <span className="font-bold">Yerinde Analiz</span> was born exactly from this need.
      </p>
      <p>
        We meticulously examine all visible and invisible aspects of a region, building, or plot. We provide a consulting service that combines architectural, urban, environmental, technical, and legal data into clear and guided reports.
      </p>
      <p>
        Our goal is not to "tell a person what to do" in real estate decisions, but to <span className="font-bold">create a solid information ground for the person to make the most accurate decision.</span> Thus, we convey the information needed in purchasing, investment, settlement, or renovation decisions in a comprehensive, clear, and applicable manner.
      </p>
      <p>
        With <span className="font-bold">Yerinde Analiz</span> consulting services, we change the perception that "information is hard to reach" and offer a reliable, professional, and accessible companionship for everyone.
      </p>
      <p>
        In addition to all this analytical process, we can support the process holistically with architectural design, application, and engineering services for users in need.
      </p>
      <p className="text-[#2C3E50] font-bold">
        Yerinde Analiz is a consulting platform that provides independent and impartial information services.
      </p>
    </>
  );

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
              src="/images/hakkimizda-renkli.jpeg"
              alt="Modern mimari konut"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-8">
              {t("story_title", locale === "en" ? "Our Story" : "Hikayemiz")}
            </h2>

            <div className="space-y-6 text-[#6B7280] leading-relaxed text-justify">
              {translations["story_content"] ? (
                <div dangerouslySetInnerHTML={{ __html: translations["story_content"] }} />
              ) : (
                locale === "en" ? enContent : trContent
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

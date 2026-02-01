"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            <span className="font-semibold">Yerinde Analiz</span>, yatırım
            sürecinizde uzun vadeli hedeflerinize en uygun yolu belirlemenize
            yardımcı olan, riskleri azaltan ve doğru kararları destekleyen
            profesyonel bir yönlendirme hizmetidir. <br />
            <span className="font-semibold">
              Arazi, konut veya proje seçimlerinde
            </span>{" "}
            mevcut durumun analizini yapar ve size özel bir yol haritası sunar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

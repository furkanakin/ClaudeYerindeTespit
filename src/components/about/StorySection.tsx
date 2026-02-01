"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function StorySection({ t }: { t: any }) {
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
              {t.story_title}
            </h2>

            <div className="space-y-6 text-[#6B7280] leading-relaxed text-justify">
              <p>{t.story_p1}</p>

              <p className="text-[#8CC63F] font-semibold text-lg">
                <span className="font-bold">{t.story_p2}</span>
              </p>

              <p>{t.story_p3}</p>
              <p>{t.story_p4}</p>
              <p>{t.story_p5}</p>
              <p>{t.story_p6}</p>

              <p className="text-[#2C3E50] font-bold">
                {t.story_signature}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

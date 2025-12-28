"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById("manifesto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Muğla manzarası"
          fill
          className="object-cover z-0"
          priority
          quality={90}
        />
        <video
          autoPlay
          muted
          playsInline
          onPlay={(e) => {
            // Video başladığında videoyu görünür yapabiliriz (opsiyonel)
            e.currentTarget.style.opacity = "1";
          }}
          onEnded={(e) => {
            const video = e.currentTarget;
            video.style.opacity = "0";
          }}
          onError={(e) => {
            // Video yüklenemezse gizle
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 opacity-0"
        >
          <source src="/images/hero-video.mov" type="video/quicktime" />
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50]/90 via-[#7ab233]/80 to-[#8CC63F]/70 z-1" />

      {/* Additional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-1" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#a3d95b] text-3xl md:text-4xl font-bold mb-4"
          >
            Muğla'da
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Gayrimenkul Yatırımlarınız İçin{" "}
            <span className="text-[#a3d95b]">Bağımsız, Teknik, Detaylı</span>{" "}
            İncelemeler
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            <p className="mb-4">Gayrimenkul alım süreçlerinde tarafsız incelemelerle kapsamlı bilgi sunuyoruz.</p>
            <p>Bağımsız analizlerle karar sürecinizi destekliyoruz.</p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/paketler">
              <Button size="lg" className="text-lg px-10">
                Paketleri İncele
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

import { Metadata } from "next";
import StorySection from "@/components/about/StorySection";
import ServicesGrid from "@/components/about/ServicesGrid";

export const metadata: Metadata = {
  title: "Hakkımızda | Yerinde Analiz",
  description:
    "Yerinde Analiz ekibi olarak gayrimenkul danışmanlığı alanında sunduğumuz profesyonel hizmetler ve hikayemiz hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-[#0D9488] to-[#0F766E]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu
          </p>
        </div>
      </section>

      <StorySection />
      <ServicesGrid />
    </div>
  );
}

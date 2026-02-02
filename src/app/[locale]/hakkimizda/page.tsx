import { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import StorySection from "@/components/about/StorySection";
import ServicesGrid from "@/components/about/ServicesGrid";

export const metadata: Metadata = {
  title: "Hakkımızda | Yerinde Analiz",
  description:
    "Yerinde Analiz ekibi olarak gayrimenkul danışmanlığı alanında sunduğumuz profesyonel hizmetler ve hikayemiz hakkında bilgi edinin.",
};

export default async function HakkimizdaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations("hakkimizda", locale);

  const t = (key: string, fallback: string) => translations[key] || fallback;

  return (
    <LanguageProvider locale={locale} translations={translations}>
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("page_title", "Hakkımızda")}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-center">
              {t("page_subtitle", "Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu")}
            </p>
          </div>
        </section>

        <StorySection locale={locale} translations={translations} />
        <ServicesGrid locale={locale} translations={translations} />
      </div>
    </LanguageProvider>
  );
}

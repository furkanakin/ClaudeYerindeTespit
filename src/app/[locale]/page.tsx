import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations("anasayfa", locale);

  return (
    <LanguageProvider locale={locale} translations={translations}>
      <HeroSection />
      <ManifestoSection />
      <WhyUsSection />
      <HowWeWorkSection />
    </LanguageProvider>
  );
}

import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import PackagesClient from "./PackagesClient";

export default async function PaketlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations("paketler", locale);
  const modalTranslations = await getTranslations("paket-modal", locale);

  // Merge translations so PackageConfigurator can access modal keys
  const allTranslations = { ...translations, ...modalTranslations };

  return (
    <LanguageProvider locale={locale} translations={allTranslations}>
      <PackagesClient locale={locale} translations={allTranslations} />
    </LanguageProvider>
  );
}

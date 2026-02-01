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

  return (
    <LanguageProvider locale={locale} translations={translations}>
      <PackagesClient locale={locale} translations={translations} />
    </LanguageProvider>
  );
}

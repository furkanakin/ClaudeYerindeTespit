import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import KvkkClient from "./KvkkClient";

export const metadata = {
    title: "KVKK Aydınlatma Metni | Yerinde Analiz",
};

export default async function KvkkPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const translations = await getTranslations("kvkk", locale);

    return (
        <LanguageProvider locale={locale} translations={translations}>
            <KvkkClient locale={locale} translations={translations} />
        </LanguageProvider>
    );
}

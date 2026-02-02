import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata = {
    title: "Gizlilik Politikası | Yerinde Analiz",
};

export default async function GizlilikPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const translations = await getTranslations("gizlilik", locale);

    return (
        <LanguageProvider locale={locale} translations={translations}>
            <PrivacyPolicyClient locale={locale} translations={translations} />
        </LanguageProvider>
    );
}

import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "Elektronik Ticari İleti Aydınlatma ve Açık Rıza Metni | Yerinde Analiz",
};

export default async function TicariIletiPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="ticari-ileti"
            locale={locale}
            fallbackTitle={locale === "en" ? "Commercial Electronic Message Consent" : "Elektronik Ticari İleti Aydınlatma ve Açık Rıza Metni"}
        />
    );
}

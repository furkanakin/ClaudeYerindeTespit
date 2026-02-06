import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "Çerez Aydınlatma Metni | Yerinde Analiz",
};

export default async function CerezAydinlatmaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="cerez-aydinlatma"
            locale={locale}
            fallbackTitle={locale === "en" ? "Cookie Policy" : "Çerez Aydınlatma Metni"}
        />
    );
}

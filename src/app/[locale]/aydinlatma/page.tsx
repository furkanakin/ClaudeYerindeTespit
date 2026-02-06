import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni | Yerinde Analiz",
};

export default async function AydinlatmaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="aydinlatma"
            locale={locale}
            fallbackTitle={locale === "en" ? "Privacy Notice" : "Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni"}
        />
    );
}

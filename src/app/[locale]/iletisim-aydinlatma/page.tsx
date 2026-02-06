import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "İletişim Formu Aydınlatma Metni | Yerinde Analiz",
};

export default async function IletisimAydinlatmaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="iletisim-aydinlatma"
            locale={locale}
            fallbackTitle={locale === "en" ? "Contact Form Privacy Notice" : "İletişim Formu Aydınlatma Metni"}
        />
    );
}

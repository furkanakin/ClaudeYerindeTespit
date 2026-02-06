import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "İlgili Kişi Başvuru Formu | Yerinde Analiz",
};

export default async function IlgiliKisiBasvuruPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="ilgili-kisi-basvuru"
            locale={locale}
            fallbackTitle={locale === "en" ? "Data Subject Request Form" : "İlgili Kişi Başvuru Formu"}
        />
    );
}

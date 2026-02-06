import { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | Yerinde Analiz",
};

export default async function KullanimKosullariPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <LegalPageClient
            slug="kullanim-kosullari"
            locale={locale}
            fallbackTitle={locale === "en" ? "Terms of Use" : "Kullanım Koşulları"}
        />
    );
}

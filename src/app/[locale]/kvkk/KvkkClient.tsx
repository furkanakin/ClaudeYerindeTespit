"use client";

import { useTranslation } from "@/lib/LanguageContext";

interface KvkkClientProps {
    locale: string;
    translations: Record<string, string>;
}

export default function KvkkClient({ locale, translations }: KvkkClientProps) {
    const { t } = useTranslation();

    const title = t("page_title", locale === "en" ? "Data Protection (KVKK)" : "KVKK Aydınlatma Metni");
    const content = t("page_content", locale === "en"
        ? "Information regarding the Personal Data Protection Law (KVKK) and your rights."
        : "Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki haklarınız ve bilgilendirme metni.");

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">{title}</h1>
                <div className="bg-white rounded-2xl p-8 shadow-sm prose max-w-none text-gray-600">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}

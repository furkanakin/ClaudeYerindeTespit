"use client";

import { useTranslation } from "@/lib/LanguageContext";

interface PrivacyPolicyClientProps {
    locale: string;
    translations: Record<string, string>;
}

export default function PrivacyPolicyClient({ locale, translations }: PrivacyPolicyClientProps) {
    const { t } = useTranslation();

    const title = t("page_title", locale === "en" ? "Privacy Policy" : "Gizlilik Politikası");
    const content = t("page_content", locale === "en"
        ? "Your privacy is important to us. This privacy policy explains how we handle your personal information."
        : "Gizliliğiniz bizim için önemlidir. Bu gizlilik politikası, kişisel verilerinizi nasıl işlediğimizi açıklar.");

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

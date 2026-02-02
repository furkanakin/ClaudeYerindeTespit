"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { packages, Package } from "@/lib/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import PackageConfigurator from "@/components/packages/PackageConfigurator";
import { getLocalizedPath } from "@/lib/i18n/routes";

interface PackagesClientProps {
    locale: string;
    translations: Record<string, string>;
}

export default function PackagesClient({ locale, translations }: PackagesClientProps) {
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const t = (key: string, fallback: string) => translations[key] || fallback;

    // Header texts based on locale
    const headerTitle = locale === "en" ? "Our Packages" : "Paketlerimiz";
    const headerSubtitle = locale === "en"
        ? "Choose the package that suits your needs and benefit from our professional consulting service"
        : "İhtiyacınıza uygun paketi seçin, profesyonel danışmanlık hizmetimizden yararlanın";

    const noteText = locale === "en"
        ? "Valid within Muğla province borders. Prices for regions outside Muğla are determined separately."
        : "Muğla il sınırları içinde geçerlidir. Muğla dışındaki bölgeler için fiyatlar ayrıca belirlenir.";

    const detailText = locale === "en"
        ? "For detailed information and special requests"
        : "Detaylı bilgi ve özel talepleriniz için";

    const contactText = locale === "en" ? "contact us" : "iletişime geçin";

    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t("page_title", headerTitle)}
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto text-center">
                        {t("page_subtitle", headerSubtitle)}
                    </p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-24 bg-[#F9FAFB]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                <PackageCard
                                    package_={pkg}
                                    onSelect={(p) => setSelectedPackage(p)}
                                    locale={locale}
                                    translations={translations}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Info Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-block bg-white rounded-2xl p-8 shadow-lg max-w-2xl">
                            <p className="text-[#6B7280] mb-4">{noteText}</p>
                            <p className="text-sm text-[#9CA3AF]">
                                {detailText}{" "}
                                <a href={getLocalizedPath("/iletisim", locale)} className="text-[#8CC63F] font-medium hover:underline">
                                    {contactText}
                                </a>
                                .
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Package Configurator Modal */}
            <PackageConfigurator
                packageData={selectedPackage}
                isOpen={!!selectedPackage}
                onClose={() => setSelectedPackage(null)}
                locale={locale}
                translations={translations}
            />
        </div>
    );
}

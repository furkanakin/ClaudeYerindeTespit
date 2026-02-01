"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { packages, Package } from "@/lib/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import PackageConfigurator from "@/components/packages/PackageConfigurator";

export default function PackagesClient({ t, locale }: { t: any, locale: string }) {
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const getContactHref = () => `/${locale}/iletisim`;

    return (
        <>
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.header_title}</h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto text-center">
                        {t.header_description}
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
                            <p className="text-[#6B7280] mb-4">
                                {locale === 'en'
                                    ? 'Valid within Muğla province. Prices for regions outside Muğla are determined separately.'
                                    : 'Muğla il sınırları içinde geçerlidir. Muğla dışındaki bölgeler için fiyatlar ayrıca belirlenir.'}
                            </p>
                            <p className="text-sm text-[#9CA3AF]">
                                {locale === 'en' ? 'For detailed information and special requests ' : 'Detaylı bilgi ve özel talepleriniz için '}
                                <a href={getContactHref()} className="text-[#8CC63F] font-medium hover:underline">
                                    {locale === 'en' ? 'contact us' : 'iletişime geçin'}
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
            />
        </>
    );
}

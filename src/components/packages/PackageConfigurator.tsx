"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { Package, PackageAddOn } from "@/lib/data/packages";
import styles from "./PackageConfigurator.module.css";
import PackageQuoteForm from "./PackageQuoteForm";

interface PackageConfiguratorProps {
    isOpen: boolean;
    onClose: () => void;
    packageData: Package | null;
    locale?: string;
    translations?: Record<string, string>;
}

export default function PackageConfigurator({
    isOpen,
    onClose,
    packageData,
    locale = "tr",
    translations = {},
}: PackageConfiguratorProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    // Reset state when package opens/changes
    useEffect(() => {
        if (packageData) {
            setSelectedOptions([]);
            setTotalPrice(packageData.basePrice);
            setShowQuoteForm(false);
        }
    }, [packageData, isOpen]);

    const toggleOption = (option: PackageAddOn) => {
        if (selectedOptions.includes(option.id)) {
            setSelectedOptions(selectedOptions.filter((id) => id !== option.id));
            setTotalPrice((prev) => prev - option.price);
        } else {
            setSelectedOptions([...selectedOptions, option.id]);
            setTotalPrice((prev) => prev + option.price);
        }
    };

    // Locale-based UI text - now uses translations from DB (via admin panel)
    const isEn = locale === "en";
    const packageConfiguratorText = translations.packageConfiguratorText || (isEn ? "Package Configurator" : "Paket Yapılandırıcı");
    const deliveryTimeLabel = translations.deliveryTimeLabel || (isEn ? "Delivery Time" : "Teslim Süresi");
    const forWhomText = translations.forWhomText || (isEn ? "Who is it for?" : "Kimler için?");
    const basePriceText = translations.basePriceText || (isEn ? "Base Price" : "Baz Fiyat");
    const extraServicesText = translations.extraServicesText || (isEn ? "Extra Services" : "Ek Hizmetler");
    const totalEstimatedText = translations.totalEstimatedText || (isEn ? "Total Estimated Amount" : "Toplam Tahmini Tutar");
    const getQuoteText = translations.getQuoteText || (isEn ? "Get Quote" : "Teklif Alın");
    const noAddonsText = translations.noAddonsText || (isEn ? "No additional services available for this package." : "Bu paket için ek hizmet bulunmamaktadır.");
    const basedOnScopeText = translations.basedOnScopeText || (isEn ? "Based on Scope" : "Kapsama Göre");
    const taxLabel = translations.taxLabel || (isEn ? "VAT" : "KDV");

    const formatPrice = (price: number) => {
        if (price === 0) return getQuoteText;
        const formatted = new Intl.NumberFormat(isEn ? "en-US" : "tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
        }).format(price);

        return `${formatted} + ${taxLabel}`;
    };

    // Parse modal description with bold markers
    const renderDescription = (description: string) => {
        const parts = description.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // Package key mapping
    const packageKeyMap: Record<string, string> = {
        "on-analiz": "pkg1",
        "yerinde-analiz": "pkg2",
        "ozel-danismanlik": "pkg3",
    };

    const pkgKey = packageData ? (packageKeyMap[packageData.id] || "pkg1") : "pkg1";
    const t = (key: string, fallback: string) => translations[key] || fallback;

    // Translated package fields
    const pkgTitle = t(`${pkgKey}_title`, packageData?.title || "");
    const pkgDesc = t(`${pkgKey}_modal_desc`, packageData?.modalDescription || packageData?.description || "");
    const pkgFooterNote = t(`${pkgKey}_footer_note`, packageData?.modalFooterNote || "");
    const pkgDelivery = t(`${pkgKey}_delivery`, packageData?.deliveryTime || "");
    const pkgBasePriceNote = t(`${pkgKey}_base_price_note`, packageData?.basePriceNote || "");
    const pkgAddonsTitle = t(`${pkgKey}_addons_title`, packageData?.addOnsTitle || (isEn ? "Extra Services and Features" : "Ek Hizmetler ve Özellikler"));
    const pkgPrice = t(`${pkgKey}_price`, packageData?.price || "");
    const pkgForWhomTitle = t(`${pkgKey}_for_whom_title`, forWhomText);
    const pkgIncludesTitle = t(`${pkgKey}_includes_title`, extraServicesText);


    if (!isOpen || !packageData) return null;

    const hasAddOns = packageData.addOns && packageData.addOns.length > 0;

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className={styles.header}>
                        <span className={styles.category}>{packageConfiguratorText}</span>
                        <h2 className={styles.title}>{pkgTitle}</h2>
                        <p className={styles.description}>
                            {renderDescription(pkgDesc)}
                        </p>
                        {packageData.deliveryTime && (
                            <p className="text-sm text-[#8CC63F] font-medium mt-2">
                                {deliveryTimeLabel}: {pkgDelivery}
                            </p>
                        )}

                        {/* Modal Footer Note (smaller text) */}
                        {t(`${pkgKey}_footer_note`, packageData.modalFooterNote || "") && (
                            <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
                                {pkgFooterNote}
                            </p>
                        )}

                        {/* Zone Info */}
                        {packageData.zoneInfo && packageData.zoneInfo.length > 0 && (
                            <div className="mt-4 p-3 bg-[#F9FAFB] rounded-lg">
                                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                                    {packageData.zoneInfo.map((zone, index) => {
                                        const zoneKey = `${pkgKey}_zone${index + 1}`;
                                        return (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-[#8CC63F] font-bold">•</span>
                                                <span>{t(zoneKey, zone)}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className={styles.content}>
                        {showQuoteForm ? (
                            <PackageQuoteForm
                                packageId={packageData.id}
                                packageTitle={pkgTitle}
                                selectedAddons={packageData.addOns?.filter(addon => selectedOptions.includes(addon.id)).map(addon => addon.name) || []}
                                totalPrice={totalPrice}
                                locale={locale}
                                translations={translations}
                                onBack={() => setShowQuoteForm(false)}
                                onSuccess={onClose}
                            />
                        ) : (
                            <>
                                <div className={styles.optionsList}>
                                    <h3 className={styles.sectionTitle}>{pkgAddonsTitle}</h3>
                                    {hasAddOns ? (
                                        packageData.addOns?.map((option, index) => {
                                            // Try to find translation for name, desc, priceLabel
                                            const addonName = t(`${pkgKey}_addon${index + 1}_name`, option.name);
                                            const addonDesc = t(`${pkgKey}_addon${index + 1}_desc`, option.description || "");

                                            // Price translation logic:
                                            // 1. Check for explicit translation in DB
                                            // 2. If price is 0, use global "Get Quote" text
                                            // 3. Fallback to hardcoded option.priceLabel
                                            let addonPrice = t(`${pkgKey}_addon${index + 1}_price`, "");
                                            if (!addonPrice) {
                                                addonPrice = option.price === 0 ? getQuoteText : option.priceLabel;
                                            }

                                            return (
                                                <div
                                                    key={option.id}
                                                    className={`${styles.optionItem} ${selectedOptions.includes(option.id) ? styles.selected : ""
                                                        }`}
                                                    onClick={() => toggleOption(option)}
                                                >
                                                    <div className={styles.checkbox}>
                                                        {selectedOptions.includes(option.id) && (
                                                            <Check size={16} color="white" />
                                                        )}
                                                    </div>
                                                    <div className={styles.optionInfo}>
                                                        <span className={styles.optionName}>{addonName}</span>
                                                        <span className={styles.optionDesc}>
                                                            {addonDesc}
                                                        </span>
                                                    </div>
                                                    <span className={styles.optionPrice}>
                                                        {addonPrice}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-gray-500 italic">{noAddonsText}</p>
                                    )}
                                </div>

                                <div className={styles.summary}>
                                    <div className={styles.summaryRow}>
                                        <div className="flex flex-col">
                                            <span>{basePriceText}</span>
                                            {packageData.basePriceNote && (
                                                <span className="text-xs text-[#9CA3AF]">{pkgBasePriceNote}</span>
                                            )}
                                        </div>
                                        <span className={styles.priceValue}>{packageData.basePrice > 0 ? formatPrice(packageData.basePrice) : basedOnScopeText}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>{extraServicesText} ({selectedOptions.length})</span>
                                        <span className={styles.priceValue}>
                                            {packageData.basePrice > 0
                                                ? `+${formatPrice(totalPrice - packageData.basePrice)}`
                                                : "0 ₺"}
                                        </span>
                                    </div>
                                    <div className={`${styles.summaryRow} ${styles.total}`}>
                                        <span>{totalEstimatedText}</span>
                                        <span className={styles.totalPrice}>
                                            {packageData.basePrice > 0 ? formatPrice(totalPrice) : pkgPrice}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => setShowQuoteForm(true)}
                                        className={styles.confirmBtn}
                                    >
                                        {getQuoteText} <ArrowRight size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

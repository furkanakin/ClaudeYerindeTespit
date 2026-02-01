"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { Package, PackageAddOn } from "@/lib/data/packages";
import styles from "./PackageConfigurator.module.css";
import Link from "next/link";

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

    // Reset state when package opens/changes
    useEffect(() => {
        if (packageData) {
            setSelectedOptions([]);
            setTotalPrice(packageData.basePrice);
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

    // Locale-based UI text
    const isEn = locale === "en";
    const packageConfiguratorText = isEn ? "Package Configurator" : "Paket Yapılandırıcı";
    const deliveryTimeLabel = isEn ? "Delivery Time" : "Teslim Süresi";
    const forWhomText = isEn ? "Who is it for?" : "Kimler için?";
    const basePriceText = isEn ? "Base Price" : "Baz Fiyat";
    const extraServicesText = isEn ? "Extra Services" : "Ek Hizmetler";
    const totalEstimatedText = isEn ? "Total Estimated Amount" : "Toplam Tahmini Tutar";
    const getQuoteText = isEn ? "Get Quote" : "Teklif Alın";
    const noAddonsText = isEn ? "No additional services available for this package." : "Bu paket için ek hizmet bulunmamaktadır.";
    const basedOnScopeText = isEn ? "Based on Scope" : "Kapsama Göre";

    const formatPrice = (price: number) => {
        if (price === 0) return getQuoteText;
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
        }).format(price) + " + KDV";
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

    if (!isOpen || !packageData) return null;

    const hasAddOns = packageData.addOns && packageData.addOns.length > 0;
    const addOnsTitle = packageData.addOnsTitle || (isEn ? "Extra Services and Features" : "Ek Hizmetler ve Özellikler");

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
                        <h2 className={styles.title}>{packageData.title}</h2>
                        <p className={styles.description}>
                            {packageData.modalDescription
                                ? renderDescription(packageData.modalDescription)
                                : packageData.description}
                        </p>
                        {packageData.deliveryTime && (
                            <p className="text-sm text-[#8CC63F] font-medium mt-2">
                                {deliveryTimeLabel}: {packageData.deliveryTime}
                            </p>
                        )}

                        {/* Modal Footer Note (smaller text) */}
                        {packageData.modalFooterNote && (
                            <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
                                {packageData.modalFooterNote}
                            </p>
                        )}

                        {/* Zone Info */}
                        {packageData.zoneInfo && packageData.zoneInfo.length > 0 && (
                            <div className="mt-4 p-3 bg-[#F9FAFB] rounded-lg">
                                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                                    {packageData.zoneInfo.map((zone, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-[#8CC63F] font-bold">•</span>
                                            <span>{zone}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className={styles.content}>
                        <div className={styles.optionsList}>
                            {/* "Kimler için?" section */}
                            {packageData.kimlerIcin && packageData.kimlerIcin.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#8CC63F] mb-3">{forWhomText}</h3>
                                    <ul className="space-y-2">
                                        {packageData.kimlerIcin.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                                <span className="text-[#8CC63F] mt-0.5">•</span>
                                                <span dangerouslySetInnerHTML={{ __html: item }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <h3 className={styles.sectionTitle}>{addOnsTitle}</h3>
                            {hasAddOns ? (
                                packageData.addOns?.map((option) => (
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
                                            <span className={styles.optionName}>{option.name}</span>
                                            <span className={styles.optionDesc}>
                                                {option.description}
                                            </span>
                                        </div>
                                        <span className={styles.optionPrice}>
                                            {option.priceLabel}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">{noAddonsText}</p>
                            )}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <div className="flex flex-col">
                                    <span>{basePriceText}</span>
                                    {packageData.basePriceNote && (
                                        <span className="text-xs text-[#9CA3AF]">{packageData.basePriceNote}</span>
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
                                    {packageData.basePrice > 0 ? formatPrice(totalPrice) : packageData.price}
                                </span>
                            </div>

                            <Link href={`/${locale}/iletisim`} onClick={onClose} className="w-full">
                                <button className={styles.confirmBtn}>
                                    {getQuoteText} <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

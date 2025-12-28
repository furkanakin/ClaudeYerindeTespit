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
}

export default function PackageConfigurator({
    isOpen,
    onClose,
    packageData,
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

    const formatPrice = (price: number) => {
        if (price === 0) return "Teklif Alın";
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
        }).format(price) + " + KDV";
    };

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
                        <span className={styles.category}>Paket Yapılandırıcı</span>
                        <h2 className={styles.title}>{packageData.title}</h2>
                        <p className={styles.description}>{packageData.description}</p>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.optionsList}>
                            <h3 className={styles.sectionTitle}>Ek Hizmetler ve Özellikler</h3>
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
                                            {option.price > 0 ? `+${formatPrice(option.price)}` : option.priceLabel}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Bu paket için ek hizmet bulunmamaktadır.</p>
                            )}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <span>Baz Fiyat</span>
                                <span>{packageData.basePrice > 0 ? formatPrice(packageData.basePrice) : "Kapsama Göre"}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Ek Hizmetler ({selectedOptions.length})</span>
                                <span>
                                    {packageData.basePrice > 0
                                        ? `+${formatPrice(totalPrice - packageData.basePrice)}`
                                        : "0 ₺"}
                                </span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Toplam Tahmini Tutar</span>
                                <span className={styles.totalPrice}>
                                    {packageData.basePrice > 0 ? formatPrice(totalPrice) : packageData.price}
                                </span>
                            </div>

                            <Link href="/iletisim" onClick={onClose} className="w-full">
                                <button className={styles.confirmBtn}>
                                    Teklif İste <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

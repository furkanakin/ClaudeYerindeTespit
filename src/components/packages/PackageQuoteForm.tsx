"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Package, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./PackageConfigurator.module.css";

interface PackageQuoteFormProps {
    packageId: string;
    packageTitle: string;
    selectedAddons: string[];
    totalPrice: number;
    locale: string;
    onBack: () => void;
    onSuccess: () => void;
    translations?: Record<string, string>;
}

const formTranslations: Record<string, Record<string, string>> = {
    tr: {
        formTitle: "Teklif Talebi",
        packageInfo: "Seçilen Paket",
        selectedServices: "Seçilen Ek Hizmetler",
        noAddons: "Ek hizmet seçilmedi",
        firstName: "Ad",
        lastName: "Soyad",
        phone: "Telefon",
        email: "E-posta",
        propertyType: "Gayrimenkul Türü",
        notes: "Eklemek istedikleriniz",
        kvkkPrefix: "",
        kvkkText: "KVKK Aydınlatma Metni",
        and: " ve ",
        privacyText: "Gizlilik Politikası",
        kvkkSuffix: "'nı okudum ve kabul ediyorum.",
        submit: "Teklif Talep Et",
        submitting: "Gönderiliyor...",
        success: "Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.",
        error: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        required: "Bu alan zorunludur",
        select: "Seçiniz",
        arazi: "Arazi",
        konut: "Konut",
        diger: "Diğer",
        back: "Geri Dön",
    },
    en: {
        formTitle: "Quote Request",
        packageInfo: "Selected Package",
        selectedServices: "Selected Add-on Services",
        noAddons: "No add-on services selected",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone",
        email: "Email",
        propertyType: "Property Type",
        notes: "Additional notes",
        kvkkPrefix: "I have read and accept the ",
        kvkkText: "KVKK Clarification Text",
        and: " and ",
        privacyText: "Privacy Policy",
        kvkkSuffix: ".",
        submit: "Request Quote",
        submitting: "Sending...",
        success: "Your request has been successfully sent. We will contact you as soon as possible.",
        error: "An error occurred. Please try again.",
        required: "This field is required",
        select: "Select",
        arazi: "Land",
        konut: "Housing",
        diger: "Other",
        back: "Go Back",
    }
};

export default function PackageQuoteForm({
    packageId,
    packageTitle,
    selectedAddons,
    totalPrice,
    locale,
    onBack,
    onSuccess,
    translations = {},
}: PackageQuoteFormProps) {
    const t = (key: string) => translations[key] || formTranslations[locale]?.[key] || formTranslations['tr'][key] || key;

    const quoteSchema = z.object({
        firstName: z.string().min(2, t("required")),
        lastName: z.string().min(2, t("required")),
        phone: z.string().min(10, t("required")),
        email: z.string().email(t("required")),
        propertyType: z.string().min(1, t("required")),
        notes: z.string().optional(),
        kvkkAccepted: z.boolean().refine((val) => val === true, {
            message: t("required"),
        }),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof quoteSchema>>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            kvkkAccepted: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof quoteSchema>) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const submitData = {
                ...data,
                package: packageId,
                source: "package",
                selectedOptions: JSON.stringify({
                    packageId,
                    packageTitle,
                    addons: selectedAddons,
                    estimatedTotal: totalPrice,
                }),
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getLocalizedHref = (path: string) => `/${locale}${path}`;

    if (submitStatus === "success") {
        return (
            <div className={styles.optionsList} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8CC63F 0%, #6B9F2E 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 10px 40px rgba(140, 198, 63, 0.3)'
                    }}>
                        <Check size={40} color="white" strokeWidth={3} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2C3E50', marginBottom: '12px' }}>
                        {locale === "en" ? "Request Sent!" : "Talebiniz İletildi!"}
                    </h3>
                    <p style={{ color: '#6B7280', maxWidth: '320px', lineHeight: '1.6' }}>{t("success")}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Left Column - Form */}
            <div className={styles.optionsList} style={{ flex: '1', borderRight: 'none' }}>
                {/* Back Button */}
                <button
                    onClick={onBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#6B7280',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        padding: '0',
                        marginBottom: '20px',
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#8CC63F'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                    <ArrowLeft size={18} />
                    {t("back")}
                </button>

                {/* Package Summary Card */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(140, 198, 63, 0.08) 0%, rgba(140, 198, 63, 0.03) 100%)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '24px',
                    border: '1px solid rgba(140, 198, 63, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #8CC63F 0%, #6B9F2E 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Package size={20} color="white" />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t("packageInfo")}</span>
                            <p style={{ fontWeight: '600', color: '#2C3E50', margin: '2px 0 0' }}>{packageTitle}</p>
                        </div>
                    </div>

                    {selectedAddons.length > 0 && (
                        <div style={{ borderTop: '1px dashed rgba(140, 198, 63, 0.3)', paddingTop: '12px', marginTop: '12px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{t("selectedServices")}:</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                                {selectedAddons.map((addon, index) => (
                                    <span key={index} style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 10px',
                                        background: 'white',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        color: '#2C3E50',
                                        border: '1px solid rgba(140, 198, 63, 0.3)'
                                    }}>
                                        <Check size={12} color="#8CC63F" />
                                        {addon}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                                {t("firstName")} <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                {...register("firstName")}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: errors.firstName ? '2px solid #EF4444' : '2px solid #E5E7EB',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8CC63F';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.firstName ? '#EF4444' : '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.firstName && (
                                <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.firstName.message}</p>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                                {t("lastName")} <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                {...register("lastName")}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: errors.lastName ? '2px solid #EF4444' : '2px solid #E5E7EB',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8CC63F';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.lastName ? '#EF4444' : '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.lastName && (
                                <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Contact Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                                {t("phone")} <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="tel"
                                {...register("phone")}
                                placeholder="05XX XXX XX XX"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: errors.phone ? '2px solid #EF4444' : '2px solid #E5E7EB',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8CC63F';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.phone ? '#EF4444' : '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.phone && (
                                <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phone.message}</p>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                                {t("email")} <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: errors.email ? '2px solid #EF4444' : '2px solid #E5E7EB',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8CC63F';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.email ? '#EF4444' : '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.email && (
                                <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                            {t("propertyType")} <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                            {...register("propertyType")}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: errors.propertyType ? '2px solid #EF4444' : '2px solid #E5E7EB',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                boxSizing: 'border-box',
                                background: 'white',
                                cursor: 'pointer'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#8CC63F';
                                e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = errors.propertyType ? '#EF4444' : '#E5E7EB';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <option value="">{t("select")}</option>
                            <option value="arazi">{t("arazi")}</option>
                            <option value="konut">{t("konut")}</option>
                            <option value="diger">{t("diger")}</option>
                        </select>
                        {errors.propertyType && (
                            <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.propertyType.message}</p>
                        )}
                    </div>

                    {/* Notes */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2C3E50', marginBottom: '6px' }}>
                            {t("notes")}
                        </label>
                        <textarea
                            {...register("notes")}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '2px solid #E5E7EB',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                boxSizing: 'border-box',
                                resize: 'vertical',
                                minHeight: '80px'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#8CC63F';
                                e.target.style.boxShadow = '0 0 0 3px rgba(140, 198, 63, 0.15)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#E5E7EB';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* KVKK Consent */}
                    <div style={{
                        padding: '16px',
                        background: 'rgba(140, 198, 63, 0.05)',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '1px solid rgba(140, 198, 63, 0.15)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <input
                                type="checkbox"
                                {...register("kvkkAccepted")}
                                id="kvkkAccepted"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    marginTop: '2px',
                                    accentColor: '#8CC63F',
                                    cursor: 'pointer'
                                }}
                            />
                            <label htmlFor="kvkkAccepted" style={{ fontSize: '0.85rem', color: '#6B7280', cursor: 'pointer', lineHeight: '1.5' }}>
                                {t("kvkkPrefix")}
                                <Link href={getLocalizedHref("/kvkk")} target="_blank" style={{ color: '#8CC63F', fontWeight: '500', textDecoration: 'none' }}>
                                    {t("kvkkText")}
                                </Link>
                                {t("and")}
                                <Link href={getLocalizedHref("/gizlilik")} target="_blank" style={{ color: '#8CC63F', fontWeight: '500', textDecoration: 'none' }}>
                                    {t("privacyText")}
                                </Link>
                                {t("kvkkSuffix")} <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                        </div>
                        {errors.kvkkAccepted && (
                            <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '8px', marginLeft: '32px' }}>{errors.kvkkAccepted.message}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {submitStatus === "error" && (
                        <div style={{
                            padding: '14px 16px',
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '20px'
                        }}>
                            <AlertCircle size={20} color="#EF4444" />
                            <p style={{ color: '#DC2626', fontSize: '0.9rem', margin: 0 }}>{t("error")}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.confirmBtn}
                        style={{
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'wait' : 'pointer'
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                {t("submitting")}
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                {t("submit")}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

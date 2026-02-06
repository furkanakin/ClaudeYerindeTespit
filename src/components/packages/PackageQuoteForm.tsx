"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        back: "Geri",
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
        back: "Back",
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

    const inputClassName =
        "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all text-sm";
    const labelClassName = "block text-sm font-medium text-[#2C3E50] mb-1";
    const errorClassName = "text-red-500 text-xs mt-1";

    const getLocalizedHref = (path: string) => `/${locale}${path}`;

    if (submitStatus === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <CheckCircle className="w-16 h-16 text-[#8CC63F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                    {locale === "en" ? "Request Sent!" : "Talebiniz İletildi!"}
                </h3>
                <p className="text-[#6B7280]">{t("success")}</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#6B7280] hover:text-[#2C3E50] mb-4 text-sm transition-colors"
            >
                <ArrowLeft size={16} />
                {t("back")}
            </button>

            {/* Package Summary */}
            <div className="bg-[#F9FAFB] rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Package size={18} className="text-[#8CC63F]" />
                    <span className="font-semibold text-[#2C3E50]">{t("packageInfo")}</span>
                </div>
                <p className="text-[#8CC63F] font-medium">{packageTitle}</p>

                {selectedAddons.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-[#6B7280]">{t("selectedServices")}:</span>
                        <ul className="mt-1 space-y-1">
                            {selectedAddons.map((addon, index) => (
                                <li key={index} className="text-sm text-[#2C3E50] flex items-center gap-1">
                                    <span className="text-[#8CC63F]">•</span> {addon}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClassName}>
                            {t("firstName")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("firstName")}
                            className={cn(inputClassName, errors.firstName && "border-red-500")}
                        />
                        {errors.firstName && (
                            <p className={errorClassName}>{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className={labelClassName}>
                            {t("lastName")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("lastName")}
                            className={cn(inputClassName, errors.lastName && "border-red-500")}
                        />
                        {errors.lastName && (
                            <p className={errorClassName}>{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClassName}>
                            {t("phone")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            {...register("phone")}
                            className={cn(inputClassName, errors.phone && "border-red-500")}
                            placeholder="05XX XXX XX XX"
                        />
                        {errors.phone && (
                            <p className={errorClassName}>{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label className={labelClassName}>
                            {t("email")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            className={cn(inputClassName, errors.email && "border-red-500")}
                        />
                        {errors.email && (
                            <p className={errorClassName}>{errors.email.message}</p>
                        )}
                    </div>
                </div>

                {/* Property Type */}
                <div>
                    <label className={labelClassName}>
                        {t("propertyType")} <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("propertyType")}
                        className={cn(inputClassName, errors.propertyType && "border-red-500")}
                    >
                        <option value="">{t("select")}</option>
                        <option value="arazi">{t("arazi")}</option>
                        <option value="konut">{t("konut")}</option>
                        <option value="diger">{t("diger")}</option>
                    </select>
                    {errors.propertyType && (
                        <p className={errorClassName}>{errors.propertyType.message}</p>
                    )}
                </div>

                {/* Notes */}
                <div>
                    <label className={labelClassName}>{t("notes")}</label>
                    <textarea
                        {...register("notes")}
                        rows={3}
                        className={inputClassName}
                    />
                </div>

                {/* KVKK Consent */}
                <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            {...register("kvkkAccepted")}
                            id="kvkkAccepted"
                            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#8CC63F] focus:ring-[#8CC63F] cursor-pointer"
                        />
                        <label htmlFor="kvkkAccepted" className="text-xs text-[#6B7280] cursor-pointer">
                            {t("kvkkPrefix")}
                            <Link href={getLocalizedHref("/kvkk")} target="_blank" className="text-[#8CC63F] hover:underline font-medium">
                                {t("kvkkText")}
                            </Link>
                            {t("and")}
                            <Link href={getLocalizedHref("/gizlilik")} target="_blank" className="text-[#8CC63F] hover:underline font-medium">
                                {t("privacyText")}
                            </Link>
                            {t("kvkkSuffix")} <span className="text-red-500">*</span>
                        </label>
                    </div>
                    {errors.kvkkAccepted && (
                        <p className={cn(errorClassName, "mt-1")}>{errors.kvkkAccepted.message}</p>
                    )}
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <p className="text-red-700 text-sm">{t("error")}</p>
                    </div>
                )}

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            {t("submitting")}
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2" />
                            {t("submit")}
                        </>
                    )}
                </Button>
            </form>
        </motion.div>
    );
}

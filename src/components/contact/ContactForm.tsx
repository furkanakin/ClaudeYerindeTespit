"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/LanguageContext";

const formTranslations: any = {
  tr: {
    firstName: "Ad",
    lastName: "Soyad",
    phone: "Telefon",
    email: "E-posta",
    package: "Hangi Paketi Tercih Ediyorsunuz?",
    propertyType: "Gayrimenkul Türü",
    purpose: "Gayrimenkulü satın alma amacınızı kısaca açıklar mısınız?",
    parcelInfo: "Ada/Parsel Bilgileri",
    listingUrl: "Varsa İlanın Linki",
    notes: "Talebinizle ilgili iletmek istedikleriniz",
    kvkkPrefix: "",
    kvkkLink: "İletişim Formu Aydınlatma Metni",
    kvkkSuffix: "'ni okudum ve kabul ediyorum.",
    submit: "Talep Oluştur",
    submitting: "Gönderiliyor...",
    success: "Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.",
    error: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
    required: "Bu alan zorunludur",
    select: "Seçiniz",
    arazi: "Arazi",
    konut: "Konut",
    diger: "Diğer",
    placeholderPurpose: "Örn: Yazlık olarak kullanmak için, yatırım amaçlı...",
    placeholderNotes: "Ek notlarınız...",
    placeholderParcel: "Örn: 123 Ada, 45 Parsel"
  },
  en: {
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    email: "Email",
    package: "Which package do you prefer?",
    propertyType: "Property Type",
    purpose: "Please briefly describe your purpose for buying the property?",
    parcelInfo: "Block/Parcel Information",
    listingUrl: "Listing URL (if any)",
    notes: "Additional notes regarding your request",
    kvkkPrefix: "I have read and accept the ",
    kvkkLink: "Contact Form Privacy Notice",
    kvkkSuffix: ".",
    submit: "Create Request",
    submitting: "Sending...",
    success: "Your request has been successfully sent. We will contact you as soon as possible.",
    error: "An error occurred. Please try again.",
    required: "This field is required",
    select: "Select",
    arazi: "Land",
    konut: "Housing",
    diger: "Other",
    placeholderPurpose: "E.g.: For summer house, investment purposes...",
    placeholderNotes: "Additional notes...",
    placeholderParcel: "E.g.: Block 123, Parcel 45"
  }
};

export default function ContactForm() {
  const { locale } = useTranslation();
  const t = (key: string) => formTranslations[locale]?.[key] || key;

  const contactSchema = z.object({
    firstName: z.string().min(2, t("required")),
    lastName: z.string().min(2, t("required")),
    phone: z.string().min(10, t("required")),
    email: z.string().email(t("required")),
    package: z.string().min(1, t("required")),
    propertyType: z.string().min(1, t("required")),
    purpose: z.string().optional(),
    parcelInfo: z.string().optional(),
    listingUrl: z.string().url().optional().or(z.literal("")),
    notes: z.string().optional(),
    kvkkAccepted: z.boolean().refine((val) => val === true, {
      message: t("required"),
    }),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [packageConfig, setPackageConfig] = useState<{
    packageId?: string;
    packageTitle?: string;
    selectedAddons?: string[];
    totalPrice?: number;
  } | null>(null);

  // Read package config from localStorage (set by PackageConfigurator)
  useEffect(() => {
    const stored = localStorage.getItem('packageConfig');
    if (stored) {
      try {
        const config = JSON.parse(stored);
        setPackageConfig(config);
      } catch (e) {
        console.error('Failed to parse packageConfig:', e);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      kvkkAccepted: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Include selected package options from localStorage
      const submitData = {
        ...data,
        selectedOptions: packageConfig?.selectedAddons?.length
          ? JSON.stringify({
            packageId: packageConfig.packageId,
            packageTitle: packageConfig.packageTitle,
            addons: packageConfig.selectedAddons,
            estimatedTotal: packageConfig.totalPrice,
          })
          : null,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        // Clear localStorage after successful submission
        localStorage.removeItem('packageConfig');
        setPackageConfig(null);
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
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all";
  const labelClassName = "block text-sm font-medium text-[#2C3E50] mb-2";
  const errorClassName = "text-red-500 text-sm mt-1";

  const getLocalizedHref = (path: string) => `/${locale}${path}`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            <p className={errorClassName}>{errors.firstName.message as string}</p>
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
            <p className={errorClassName}>{errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            <p className={errorClassName}>{errors.phone.message as string}</p>
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
            <p className={errorClassName}>{errors.email.message as string}</p>
          )}
        </div>
      </div>

      {/* Selection Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClassName}>
            {t("package")} <span className="text-red-500">*</span>
          </label>
          <select
            {...register("package")}
            className={cn(inputClassName, errors.package && "border-red-500")}
          >
            <option value="">{t("select")}</option>
            <option value="on-analiz">{locale === 'en' ? 'Preliminary Analysis' : 'Ön Analiz'}</option>
            <option value="yerinde-analiz">{locale === 'en' ? 'On-Site Analysis' : 'Yerinde Analiz'}</option>
            <option value="ozel-danismanlik">{locale === 'en' ? 'Premium Consulting' : 'Premium Analiz / Danışmanlık'}</option>
          </select>
          {errors.package && (
            <p className={errorClassName}>{errors.package.message as string}</p>
          )}
        </div>
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
            <p className={errorClassName}>{errors.propertyType.message as string}</p>
          )}
        </div>
      </div>

      {/* Purpose */}
      <div className="mb-6">
        <label className={labelClassName}>
          {t("purpose")}
        </label>
        <textarea
          {...register("purpose")}
          rows={3}
          className={inputClassName}
          placeholder={t("placeholderPurpose")}
        />
      </div>

      {/* Parcel Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClassName}>{t("parcelInfo")}</label>
          <input
            type="text"
            {...register("parcelInfo")}
            className={inputClassName}
            placeholder={t("placeholderParcel")}
          />
        </div>
        <div>
          <label className={labelClassName}>{t("listingUrl")}</label>
          <input
            type="url"
            {...register("listingUrl")}
            className={cn(inputClassName, errors.listingUrl && "border-red-500")}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className={labelClassName}>
          {t("notes")}
        </label>
        <textarea
          {...register("notes")}
          rows={4}
          className={inputClassName}
          placeholder={t("placeholderNotes")}
        />
      </div>

      {/* KVKK Consent */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("kvkkAccepted")}
            id="kvkkAccepted"
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#8CC63F] focus:ring-[#8CC63F] cursor-pointer"
          />
          <label htmlFor="kvkkAccepted" className="text-sm text-[#6B7280] cursor-pointer">
            <Link href={getLocalizedHref("/iletisim-aydinlatma")} target="_blank" className="text-[#8CC63F] hover:underline font-medium">
              {t("kvkkLink")}
            </Link>
            {t("kvkkSuffix")} <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.kvkkAccepted && (
          <p className={cn(errorClassName, "mt-2")}>{errors.kvkkAccepted.message as string}</p>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-700">{t("success")}</p>
        </motion.div>
      )}
      {submitStatus === "error" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{t("error")}</p>
        </motion.div>
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
    </motion.form>
  );
}

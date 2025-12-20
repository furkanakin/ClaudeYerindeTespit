"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import FileUpload from "./FileUpload";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  package: z.string().min(1, "Lütfen bir paket seçiniz"),
  propertyType: z.string().min(1, "Lütfen gayrimenkul türünü seçiniz"),
  purpose: z.string().optional(),
  parcelInfo: z.string().optional(),
  listingUrl: z.string().url("Geçerli bir URL giriniz").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setFiles([]);
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
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 outline-none transition-all";
  const labelClassName = "block text-sm font-medium text-[#111827] mb-2";
  const errorClassName = "text-red-500 text-sm mt-1";

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
            Ad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("firstName")}
            className={cn(inputClassName, errors.firstName && "border-red-500")}
            placeholder="Adınız"
          />
          {errors.firstName && (
            <p className={errorClassName}>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className={labelClassName}>
            Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("lastName")}
            className={cn(inputClassName, errors.lastName && "border-red-500")}
            placeholder="Soyadınız"
          />
          {errors.lastName && (
            <p className={errorClassName}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClassName}>
            Telefon <span className="text-red-500">*</span>
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
            E-posta <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            className={cn(inputClassName, errors.email && "border-red-500")}
            placeholder="ornek@email.com"
          />
          {errors.email && (
            <p className={errorClassName}>{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Selection Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClassName}>
            Hangi Paketi Tercih Ediyorsunuz? <span className="text-red-500">*</span>
          </label>
          <select
            {...register("package")}
            className={cn(inputClassName, errors.package && "border-red-500")}
          >
            <option value="">Seçiniz</option>
            <option value="on-analiz">Ön Analiz</option>
            <option value="yerinde-analiz">Yerinde Analiz</option>
            <option value="ozel-danismanlik">Özel Yerinde Analiz - Danışmanlık</option>
          </select>
          {errors.package && (
            <p className={errorClassName}>{errors.package.message}</p>
          )}
        </div>
        <div>
          <label className={labelClassName}>
            Gayrimenkul Türü <span className="text-red-500">*</span>
          </label>
          <select
            {...register("propertyType")}
            className={cn(inputClassName, errors.propertyType && "border-red-500")}
          >
            <option value="">Seçiniz</option>
            <option value="arazi">Arazi</option>
            <option value="konut">Konut</option>
            <option value="diger">Diğer</option>
          </select>
          {errors.propertyType && (
            <p className={errorClassName}>{errors.propertyType.message}</p>
          )}
        </div>
      </div>

      {/* Purpose */}
      <div className="mb-6">
        <label className={labelClassName}>
          Gayrimenkulü satın alma amacınızı kısaca açıklar mısınız?
        </label>
        <textarea
          {...register("purpose")}
          rows={3}
          className={inputClassName}
          placeholder="Örn: Yazlık olarak kullanmak için, yatırım amaçlı..."
        />
      </div>

      {/* Parcel Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClassName}>Ada/Parsel Bilgileri</label>
          <input
            type="text"
            {...register("parcelInfo")}
            className={inputClassName}
            placeholder="Örn: 123 Ada, 45 Parsel"
          />
        </div>
        <div>
          <label className={labelClassName}>Varsa İlanın Linki</label>
          <input
            type="url"
            {...register("listingUrl")}
            className={cn(inputClassName, errors.listingUrl && "border-red-500")}
            placeholder="https://..."
          />
          {errors.listingUrl && (
            <p className={errorClassName}>{errors.listingUrl.message}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className={labelClassName}>
          Gayrimenkule ait eklemek istedikleriniz (Plan, proje vb.)
        </label>
        <FileUpload files={files} setFiles={setFiles} />
        <p className="text-xs text-[#9CA3AF] mt-2">
          JPEG, PNG, PDF, DWG formatları kabul edilir. Maksimum 10MB.
        </p>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label className={labelClassName}>
          Talebinizle ilgili iletmek istedikleriniz
        </label>
        <textarea
          {...register("notes")}
          rows={4}
          className={inputClassName}
          placeholder="Ek notlarınız..."
        />
      </div>

      {/* Submit Status */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-700">
            Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">
            Bir hata oluştu. Lütfen tekrar deneyiniz veya doğrudan e-posta ile iletişime geçiniz.
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Talep Oluştur
          </>
        )}
      </Button>
    </motion.form>
  );
}

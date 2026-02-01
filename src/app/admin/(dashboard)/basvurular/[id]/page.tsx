import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    Package,
    MapPin,
    Calendar,
    Link as LinkIcon,
    FileText,
    User,
    Building,
    Target,
} from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function BasvuruDetayPage({ params }: Props) {
    const { id } = await params;

    const submission = await prisma.contactSubmission.findUnique({
        where: { id },
    });

    if (!submission) {
        notFound();
    }

    // Mark as read
    if (!submission.isRead) {
        await prisma.contactSubmission.update({
            where: { id },
            data: { isRead: true },
        });
    }

    const infoItems = [
        {
            label: "Ad Soyad",
            value: `${submission.firstName} ${submission.lastName}`,
            icon: User,
        },
        { label: "E-posta", value: submission.email, icon: Mail, href: `mailto:${submission.email}` },
        { label: "Telefon", value: submission.phone, icon: Phone, href: `tel:${submission.phone}` },
        { label: "Paket", value: submission.package, icon: Package },
        { label: "Gayrimenkul Türü", value: submission.propertyType, icon: Building },
        { label: "Ada/Parsel", value: submission.parcelInfo || "-", icon: MapPin },
        {
            label: "Başvuru Tarihi",
            value: new Date(submission.createdAt).toLocaleString("tr-TR"),
            icon: Calendar,
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/basvurular"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-[#2C3E50]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#2C3E50]">
                        {submission.firstName} {submission.lastName}
                    </h1>
                    <p className="text-[#6B7280]">Başvuru Detayları</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact & Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">
                            İletişim Bilgileri
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {infoItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="p-2 bg-[#F3F4F6] rounded-lg">
                                        <item.icon className="w-4 h-4 text-[#6B7280]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-[#2C3E50] font-medium hover:text-[#8CC63F] transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-[#2C3E50] font-medium">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Purpose */}
                    {submission.purpose && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5 text-[#8CC63F]" />
                                <h2 className="text-lg font-semibold text-[#2C3E50]">
                                    Satın Alma Amacı
                                </h2>
                            </div>
                            <p className="text-[#6B7280] whitespace-pre-wrap">
                                {submission.purpose}
                            </p>
                        </div>
                    )}

                    {/* Notes */}
                    {submission.notes && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-[#8CC63F]" />
                                <h2 className="text-lg font-semibold text-[#2C3E50]">
                                    Ek Notlar
                                </h2>
                            </div>
                            <p className="text-[#6B7280] whitespace-pre-wrap">
                                {submission.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Listing URL */}
                    {submission.listingUrl && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <LinkIcon className="w-5 h-5 text-[#8CC63F]" />
                                <h2 className="text-lg font-semibold text-[#2C3E50]">
                                    İlan Linki
                                </h2>
                            </div>
                            <a
                                href={submission.listingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#8CC63F] hover:underline break-all text-sm"
                            >
                                {submission.listingUrl}
                            </a>
                        </div>
                    )}

                    {/* KVKK Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">
                            KVKK Onayı
                        </h2>
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${submission.kvkkAccepted
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {submission.kvkkAccepted ? "Onaylandı" : "Onaylanmadı"}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">
                            Hızlı İşlemler
                        </h2>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${submission.email}`}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#8CC63F] text-white rounded-lg hover:bg-[#7ab233] transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                E-posta Gönder
                            </a>
                            <a
                                href={`tel:${submission.phone}`}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#8CC63F] text-[#8CC63F] rounded-lg hover:bg-[#8CC63F]/10 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Ara
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

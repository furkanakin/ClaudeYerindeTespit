import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Package,
    Home,
    FileText,
    Link as LinkIcon,
    Clock,
    CheckCircle,
} from "lucide-react";
import DeleteSubmissionButton from "@/components/admin/DeleteSubmissionButton";

async function getSubmission(id: string) {
    try {
        const submission = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (submission && !submission.isRead) {
            await prisma.contactSubmission.update({
                where: { id },
                data: { isRead: true },
            });
        }

        return submission;
    } catch {
        return null;
    }
}

export default async function BasvuruDetayPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const submission = await getSubmission(id);

    if (!submission) {
        notFound();
    }

    const packageNames: Record<string, string> = {
        "on-analiz": "Ön Analiz",
        "yerinde-analiz": "Yerinde Analiz",
        "ozel-danismanlik": "Premium Analiz / Danışmanlık",
    };

    const propertyTypes: Record<string, string> = {
        arazi: "Arazi",
        konut: "Konut",
        diger: "Diğer",
    };

    const infoItems = [
        {
            label: "Ad Soyad",
            value: `${submission.firstName} ${submission.lastName}`,
            icon: User,
        },
        { label: "E-posta", value: submission.email, icon: Mail },
        { label: "Telefon", value: submission.phone, icon: Phone },
        {
            label: "Paket",
            value: packageNames[submission.package] || submission.package,
            icon: Package,
        },
        {
            label: "Gayrimenkul Türü",
            value: propertyTypes[submission.propertyType] || submission.propertyType,
            icon: Home,
        },
        {
            label: "Başvuru Tarihi",
            value: formatDate(submission.createdAt),
            icon: Clock,
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin/basvurular"
                    className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#2C3E50] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Geri
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-[#2C3E50] mb-6">
                            Başvuru Bilgileri
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {infoItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-[#8CC63F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-[#8CC63F]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#6B7280]">{item.label}</p>
                                        <p className="font-medium text-[#2C3E50]">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-[#2C3E50] mb-6">
                            Ek Bilgiler
                        </h2>
                        <div className="space-y-6">
                            {submission.purpose && (
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Satın Alma Amacı
                                    </p>
                                    <p className="text-[#2C3E50] bg-[#F9FAFB] p-4 rounded-lg">
                                        {submission.purpose}
                                    </p>
                                </div>
                            )}

                            {submission.parcelInfo && (
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-2 flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        Ada/Parsel Bilgileri
                                    </p>
                                    <p className="text-[#2C3E50] bg-[#F9FAFB] p-4 rounded-lg">
                                        {submission.parcelInfo}
                                    </p>
                                </div>
                            )}

                            {submission.listingUrl && (
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-2 flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4" />
                                        İlan Linki
                                    </p>
                                    <a
                                        href={submission.listingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#8CC63F] hover:underline break-all"
                                    >
                                        {submission.listingUrl}
                                    </a>
                                </div>
                            )}

                            {submission.notes && (
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Ek Notlar
                                    </p>
                                    <p className="text-[#2C3E50] bg-[#F9FAFB] p-4 rounded-lg whitespace-pre-wrap">
                                        {submission.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="font-semibold text-[#2C3E50] mb-4">Durum</h3>
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Okundu</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="font-semibold text-[#2C3E50] mb-4">KVKK Onayı</h3>
                        <div
                            className={`flex items-center gap-2 ${submission.kvkkAccepted ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">
                                {submission.kvkkAccepted ? "Onaylandı" : "Onaylanmadı"}
                            </span>
                        </div>
                    </div>

                    <DeleteSubmissionButton id={submission.id} />
                </div>
            </div>
        </div>
    );
}

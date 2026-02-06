import { prisma } from "@/lib/prisma";
import { ContactSubmission } from "@prisma/client";
import Link from "next/link";
import { formatDistanceToNow } from "@/lib/utils";
import { Mail, Eye, EyeOff, ArrowRight, Package } from "lucide-react";

async function getPackageSubmissions(): Promise<ContactSubmission[]> {
    try {
        return await prisma.contactSubmission.findMany({
            where: { source: "package" },
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export default async function PaketTalepleriPage() {
    const submissions = await getPackageSubmissions();

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2C3E50]">Paket Talepleri</h1>
                <p className="text-[#6B7280] mt-1">
                    Paket sayfasından gelen teklif talepleri
                </p>
            </div>

            {submissions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <Package className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                    <p className="text-[#6B7280]">Henüz paket talebi bulunmuyor</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <table className="w-full">
                        <thead className="bg-[#F9FAFB]">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                                    Durum
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                                    Ad Soyad
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                                    E-posta
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                                    Paket
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                                    Tarih
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-[#2C3E50]">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {submissions.map((submission) => (
                                <tr
                                    key={submission.id}
                                    className={`hover:bg-gray-50 transition-colors ${!submission.isRead ? "bg-blue-50/30" : ""
                                        }`}
                                >
                                    <td className="px-6 py-4">
                                        {submission.isRead ? (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF]">
                                                <Eye className="w-4 h-4" />
                                                Okundu
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-[#8CC63F] font-medium">
                                                <EyeOff className="w-4 h-4" />
                                                Yeni
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#2C3E50]">
                                            {submission.firstName} {submission.lastName}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B7280]">
                                        {submission.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2.5 py-1 bg-[#8CC63F]/10 text-[#8CC63F] text-sm font-medium rounded-full">
                                            {submission.package === "on-analiz"
                                                ? "Ön Analiz"
                                                : submission.package === "yerinde-analiz"
                                                    ? "Yerinde Analiz"
                                                    : "Premium"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B7280] text-sm">
                                        {formatDistanceToNow(submission.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/basvurular/${submission.id}`}
                                            className="inline-flex items-center gap-1 text-[#8CC63F] hover:text-[#7ab233] font-medium text-sm"
                                        >
                                            Görüntüle
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

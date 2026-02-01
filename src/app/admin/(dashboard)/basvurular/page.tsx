import prisma from "@/lib/prisma";
import { ContactSubmission } from "@prisma/client";
import Link from "next/link";
import { Eye, Mail, Phone, Package, Calendar } from "lucide-react";

export default async function BasvurularPage() {
    const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#2C3E50]">Başvurular</h1>
                <p className="text-[#6B7280]">{submissions.length} başvuru</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {submissions.length === 0 ? (
                    <div className="p-12 text-center">
                        <Mail className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                        <p className="text-[#6B7280]">Henüz başvuru bulunmuyor</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        Durum
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        Ad Soyad
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        İletişim
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        Paket
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        Tarih
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                                        İşlem
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {submissions.map((submission: ContactSubmission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.isRead
                                                    ? "bg-gray-100 text-gray-600"
                                                    : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {submission.isRead ? "Okundu" : "Yeni"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#2C3E50]">
                                                {submission.firstName} {submission.lastName}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-[#6B7280] flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {submission.email}
                                                </p>
                                                <p className="text-sm text-[#6B7280] flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {submission.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 text-sm text-[#6B7280]">
                                                <Package className="w-4 h-4" />
                                                {submission.package}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 text-sm text-[#6B7280]">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(submission.createdAt).toLocaleDateString(
                                                    "tr-TR",
                                                    {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/basvurular/${submission.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#8CC63F] text-white text-sm font-medium rounded-lg hover:bg-[#7ab233] transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Görüntüle
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

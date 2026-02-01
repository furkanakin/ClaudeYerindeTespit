import prisma from "@/lib/prisma";
import { ContactSubmission } from "@prisma/client";
import { FileText, Eye } from "lucide-react";

export default async function AdminDashboard() {
    // Get submission stats
    const totalSubmissions = await prisma.contactSubmission.count();
    const unreadSubmissions = await prisma.contactSubmission.count({
        where: { isRead: false },
    });
    const recentSubmissions = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    const stats = [
        {
            title: "Toplam Başvuru",
            value: totalSubmissions,
            icon: FileText,
            color: "bg-blue-500",
        },
        {
            title: "Okunmamış",
            value: unreadSubmissions,
            icon: Eye,
            color: "bg-orange-500",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2C3E50] mb-6">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-[#2C3E50]">{stat.value}</p>
                        <p className="text-sm text-[#6B7280] mt-1">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-[#2C3E50]">
                        Son Başvurular
                    </h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {recentSubmissions.length === 0 ? (
                        <div className="p-6 text-center text-[#6B7280]">
                            Henüz başvuru bulunmuyor
                        </div>
                    ) : (
                        recentSubmissions.map((submission: ContactSubmission) => (
                            <a
                                key={submission.id}
                                href={`/admin/basvurular/${submission.id}`}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-2 h-2 rounded-full ${submission.isRead ? "bg-gray-300" : "bg-[#8CC63F]"
                                            }`}
                                    />
                                    <div>
                                        <p className="font-medium text-[#2C3E50]">
                                            {submission.firstName} {submission.lastName}
                                        </p>
                                        <p className="text-sm text-[#6B7280]">{submission.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-[#6B7280]">{submission.package}</p>
                                    <p className="text-xs text-[#9CA3AF]">
                                        {new Date(submission.createdAt).toLocaleDateString("tr-TR")}
                                    </p>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

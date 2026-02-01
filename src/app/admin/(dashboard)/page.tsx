import { prisma } from "@/lib/prisma";
import { Mail, FileText, Eye, Clock } from "lucide-react";

async function getStats() {
    try {
        const totalSubmissions = await prisma.contactSubmission.count();
        const unreadSubmissions = await prisma.contactSubmission.count({
            where: { isRead: false },
        });
        const todaySubmissions = await prisma.contactSubmission.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        });
        return { totalSubmissions, unreadSubmissions, todaySubmissions };
    } catch {
        return { totalSubmissions: 0, unreadSubmissions: 0, todaySubmissions: 0 };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        {
            title: "Toplam Başvuru",
            value: stats.totalSubmissions,
            icon: Mail,
            color: "bg-blue-500",
        },
        {
            title: "Okunmamış",
            value: stats.unreadSubmissions,
            icon: Eye,
            color: "bg-orange-500",
        },
        {
            title: "Bugünkü Başvuru",
            value: stats.todaySubmissions,
            icon: Clock,
            color: "bg-green-500",
        },
        {
            title: "Toplam Sayfa İçeriği",
            value: 5,
            icon: FileText,
            color: "bg-purple-500",
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2C3E50]">Dashboard</h1>
                <p className="text-[#6B7280] mt-1">
                    Yerinde Analiz yönetim paneline hoş geldiniz
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#6B7280]">{stat.title}</p>
                                <p className="text-3xl font-bold text-[#2C3E50] mt-1">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">
                    Hızlı İşlemler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/basvurular"
                        className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#8CC63F]/10 transition-colors"
                    >
                        <Mail className="w-5 h-5 text-[#8CC63F]" />
                        <span className="text-[#2C3E50] font-medium">
                            Başvuruları Görüntüle
                        </span>
                    </a>
                    <a
                        href="/admin/icerik/anasayfa"
                        className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#8CC63F]/10 transition-colors"
                    >
                        <FileText className="w-5 h-5 text-[#8CC63F]" />
                        <span className="text-[#2C3E50] font-medium">İçerik Düzenle</span>
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#8CC63F]/10 transition-colors"
                    >
                        <Eye className="w-5 h-5 text-[#8CC63F]" />
                        <span className="text-[#2C3E50] font-medium">Siteyi Görüntüle</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

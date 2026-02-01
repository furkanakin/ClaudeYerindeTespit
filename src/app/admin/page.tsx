"use client";

import { motion } from "framer-motion";
import { MessageSquare, Globe, Users, TrendingUp } from "lucide-react";

const stats = [
    { label: "Yeni Başvurular", value: "0", icon: MessageSquare, color: "bg-blue-500" },
    { label: "Toplam İçerik", value: "0", icon: Globe, color: "bg-[#8CC63F]" },
    { label: "Bugünkü Ziyaret", value: "0", icon: TrendingUp, color: "bg-purple-500" },
    { label: "Kullanıcılar", value: "1", icon: Users, color: "bg-orange-500" },
];

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2C3E50]">Panel Özeti</h1>
                <p className="text-gray-500 mt-2">Yerinde Analiz web sitesi yönetim istatistikleri.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-[#2C3E50]">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Hoş Geldiniz!</h2>
                <p className="text-gray-600 max-w-lg mx-auto">
                    Yönetim panelini kullanarak başvuruları takip edebilir ve web sitesi içeriğini
                    hem Türkçe hem İngilizce olarak düzenleyebilirsiniz.
                </p>
            </div>
        </div>
    );
}

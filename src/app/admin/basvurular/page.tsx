"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Calendar,
    Mail,
    Phone,
    ChevronRight,
    LayoutList,
    Eye,
    X,
    User,
    MapPin,
    Link as LinkIcon,
    Package
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchSubmissions = async () => {
        try {
            const res = await fetch("/api/admin/submissions");
            const data = await res.json();
            if (Array.isArray(data)) setSubmissions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const filtered = submissions.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="relative">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C3E50]">Başvurular</h1>
                    <p className="text-gray-500 mt-2">İletişim formundan gelen tüm talepler.</p>
                </div>

                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="İsim veya e-posta ile ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#8CC63F] transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">AD SOYAD</th>
                                <th className="px-6 py-4">İletişim</th>
                                <th className="px-6 py-4">Paket</th>
                                <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Yükleniyor...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Başvuru bulunamadı.</td>
                                </tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-[#2C3E50]">{item.firstName} {item.lastName}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Mail className="w-4 h-4" /> {item.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Phone className="w-4 h-4" /> {item.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-[#8CC63F]/10 text-[#8CC63F] text-xs font-bold rounded-full uppercase">
                                                {item.package}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedSubmission(item)}
                                                className="p-2 text-[#8CC63F] hover:bg-[#8CC63F]/10 rounded-lg transition-colors"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submission Detail Sidebar/Modal */}
            <AnimatePresence>
                {selectedSubmission && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setSelectedSubmission(null)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-[60] overflow-y-auto"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                                    <h2 className="text-2xl font-bold text-[#2C3E50]">Başvuru Detayı</h2>
                                    <button
                                        onClick={() => setSelectedSubmission(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {/* Status & Date */}
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="px-4 py-2 bg-[#8CC63F] text-white text-sm font-bold rounded-xl">
                                            {selectedSubmission.package}
                                        </span>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(selectedSubmission.createdAt)} tarihinde gönderildi
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <section>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <User className="w-4 h-4" /> Müşteri Bilgileri
                                        </h3>
                                        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 font-medium">Ad Soyad</p>
                                                <p className="font-bold text-[#2C3E50]">{selectedSubmission.firstName} {selectedSubmission.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 font-medium">Teleon</p>
                                                <p className="font-bold text-[#2C3E50]">{selectedSubmission.phone}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-gray-500 mb-1 font-medium">E-posta</p>
                                                <p className="font-bold text-[#2C3E50]">{selectedSubmission.email}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Property Info */}
                                    <section>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> Gayrimenkul Bilgileri
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                                <span className="text-gray-600">Tür</span>
                                                <span className="font-bold text-[#2C3E50] uppercase">{selectedSubmission.propertyType}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                                <span className="text-gray-600">Ada / Parsel</span>
                                                <span className="font-bold text-[#2C3E50]">{selectedSubmission.parcelInfo || "-"}</span>
                                            </div>
                                            <div className="border-b border-gray-100 pb-4">
                                                <span className="text-gray-600 block mb-2">İlan Linki</span>
                                                {selectedSubmission.listingUrl ? (
                                                    <a href={selectedSubmission.listingUrl} target="_blank" className="text-[#8CC63F] font-medium flex items-center gap-2 hover:underline">
                                                        <LinkIcon className="w-4 h-4" /> Linki Aç
                                                    </a>
                                                ) : "-"}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Reasons & Notes */}
                                    <section>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Açıklamalar</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm font-bold text-[#2C3E50] mb-2">Satın Alma Amacı</p>
                                                <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl leading-relaxed italic">
                                                    {selectedSubmission.purpose || "Belirtilmedi."}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#2C3E50] mb-2">Müşteri Notu</p>
                                                <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl leading-relaxed italic">
                                                    {selectedSubmission.notes || "Not eklenmedi."}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="pt-8 flex gap-4">
                                        <Button className="flex-grow py-4" onClick={() => setSelectedSubmission(null)}>Kapat</Button>
                                        <a href={`mailto:${selectedSubmission.email}`} className="flex-grow">
                                            <Button variant="outline" className="w-full h-full py-4">Yanıtla</Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Globe, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContentItem {
    key: string;
    tr: string;
    en: string;
    label?: string;
}

export default function ContentEditor({ pageSlug, title }: { pageSlug: string; title: string }) {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`/api/admin/content?page=${pageSlug}`);
                const data = await res.json();
                if (Array.isArray(data)) setContent(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, [pageSlug]);

    const handleUpdate = (key: string, field: "tr" | "en", value: string) => {
        setContent(prev => prev.map(item =>
            item.key === key ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setStatus(null);
        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageSlug, updates: content }),
            });
            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch {
            setStatus("error");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="text-center py-20">Yükleniyor...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="sticky top-0 bg-[#F3F4F6]/80 backdrop-blur-md pt-4 pb-6 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C3E50]">{title}</h1>
                    <p className="text-gray-500 mt-1">İçerikleri TR ve EN olarak yan yana düzenleyin.</p>
                </div>

                <div className="flex items-center gap-4">
                    {status === "success" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-xl">
                            <CheckCircle className="w-4 h-4" /> Değişiklikler Kaydedildi
                        </motion.div>
                    )}
                    <Button onClick={handleSave} disabled={isSaving} className="px-8 shadow-lg shadow-[#8CC63F]/20">
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                        Değişiklikleri Kaydet
                    </Button>
                </div>
            </div>

            <div className="space-y-12 pb-24">
                {content.map((item) => (
                    <div key={item.key} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#8CC63F]" /> {item.label || item.key}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Turkish Content */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Türkçe (TR)</label>
                                <textarea
                                    value={item.tr}
                                    onChange={(e) => handleUpdate(item.key, "tr", e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8CC63F] outline-none transition-all min-h-[120px] leading-relaxed"
                                />
                            </div>

                            {/* English Content */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 mb-2 uppercase">İngilizce (EN)</label>
                                <textarea
                                    value={item.en}
                                    onChange={(e) => handleUpdate(item.key, "en", e.target.value)}
                                    className="w-full p-4 bg-blue-50/30 border border-blue-100 rounded-xl focus:bg-white focus:border-blue-400 outline-none transition-all min-h-[120px] leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {content.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Bu sayfa için henüz metin anahtarı tanımlanmamış.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

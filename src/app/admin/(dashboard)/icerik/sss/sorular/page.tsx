"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, GripVertical, Save, X, HelpCircle, Database } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface FAQ {
    id: string;
    questionTr: string;
    answerTr: string;
    questionEn: string;
    answerEn: string;
    order: number;
}

export default function SSSorularPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        questionTr: "",
        answerTr: "",
        questionEn: "",
        answerEn: "",
        order: 0
    });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/faq", { cache: "no-store" });
            const data = await res.json();
            if (Array.isArray(data)) {
                setFaqs(data);
            }
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (faq: FAQ | null = null) => {
        if (faq) {
            setEditingFaq(faq);
            setFormData({
                questionTr: faq.questionTr,
                answerTr: faq.answerTr,
                questionEn: faq.questionEn,
                answerEn: faq.answerEn,
                order: faq.order
            });
        } else {
            setEditingFaq(null);
            setFormData({
                questionTr: "",
                answerTr: "",
                questionEn: "",
                answerEn: "",
                order: faqs.length
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/faq/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFaqs(faqs.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete FAQ:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const method = editingFaq ? "PUT" : "POST";
        const url = editingFaq ? `/api/admin/faq/${editingFaq.id}` : "/api/admin/faq";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await fetchFaqs();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to save FAQ:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#2C3E50]">Sıkça Sorulan Sorular</h1>
                    <p className="text-gray-500">Soru ve cevapları buradan yönetebilirsiniz.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={async () => {
                            if (!confirm("Mevcut statik verileri veritabanına aktarmak istediğinize emin misiniz?")) return;
                            setIsLoading(true);
                            try {
                                const res = await fetch("/api/admin/faq/seed", {
                                    method: "POST",
                                    cache: "no-store"
                                });
                                const data = await res.json();
                                if (data.success) {
                                    alert(`${data.count} adet soru başarıyla aktarıldı.`);
                                    await fetchFaqs();
                                } else {
                                    alert(`Hata: ${data.error || "Aktarım başarısız."}`);
                                }
                            } catch (e) {
                                alert("Aktarım sırasında sistemsel bir hata oluştu.");
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                    >
                        <Database className="w-4 h-4" />
                        Statik Verileri Aktar
                    </Button>
                    <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Yeni Soru Ekle
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8CC63F]"></div>
                </div>
            ) : faqs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Henüz hiç soru eklenmemiş.</p>
                    <Button variant="outline" onClick={() => handleOpenModal()} className="mt-4">
                        İlk Soruyu Ekle
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 transition-hover hover:shadow-md">
                            <div className="text-gray-400 cursor-move">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-[#8CC63F] uppercase tracking-wider mb-1">TR</p>
                                        <p className="font-medium text-[#2C3E50] truncate">{faq.questionTr}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#8CC63F] uppercase tracking-wider mb-1">EN</p>
                                        <p className="font-medium text-[#2C3E50] truncate">{faq.questionEn}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleOpenModal(faq)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Düzenle"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(faq.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MCQ Edit/Add Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingFaq ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Türkçe */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-[#2C3E50] border-b pb-2 flex items-center gap-2">
                                <span>🇹🇷</span> Türkçe İçerik
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soru</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.questionTr}
                                    onChange={(e) => setFormData({ ...formData, questionTr: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8CC63F]/20 focus:border-[#8CC63F] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cevap</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answerTr}
                                    onChange={(e) => setFormData({ ...formData, answerTr: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8CC63F]/20 focus:border-[#8CC63F] outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* İngilizce */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-[#2C3E50] border-b pb-2 flex items-center gap-2">
                                <span>🇬🇧</span> English Content
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.questionEn}
                                    onChange={(e) => setFormData({ ...formData, questionEn: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8CC63F]/20 focus:border-[#8CC63F] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answerEn}
                                    onChange={(e) => setFormData({ ...formData, answerEn: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8CC63F]/20 focus:border-[#8CC63F] outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama (Order)</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8CC63F]/20 focus:border-[#8CC63F] outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">Küçük sayılar daha üstte görünür.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            disabled={isSubmitting}
                        >
                            İptal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {editingFaq ? "Güncelle" : "Kaydet"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

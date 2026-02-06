"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Save, Loader2, Plus, FileText, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded-lg" />,
});

interface LegalPage {
    id: string;
    slug: string;
    titleTr: string;
    titleEn: string;
    contentTr: string;
    contentEn: string;
    isActive: boolean;
}

const defaultPages = [
    { slug: "kullanim-kosullari", titleTr: "Kullanım Koşulları", titleEn: "Terms of Use" },
    { slug: "cerez-aydinlatma", titleTr: "Çerez Aydınlatma Metni", titleEn: "Cookie Policy" },
    { slug: "aydinlatma", titleTr: "Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni", titleEn: "Privacy Notice" },
    { slug: "ilgili-kisi-basvuru", titleTr: "İlgili Kişi Başvuru Formu", titleEn: "Data Subject Request Form" },
    { slug: "iletisim-aydinlatma", titleTr: "İletişim Formu Aydınlatma Metni", titleEn: "Contact Form Privacy Notice" },
    { slug: "ticari-ileti", titleTr: "Elektronik Ticari İleti Aydınlatma ve Açık Rıza Metni", titleEn: "Commercial Electronic Message Consent" },
];

export default function SozlesmelerPage() {
    const [pages, setPages] = useState<LegalPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [expandedPage, setExpandedPage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"tr" | "en">("tr");

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await fetch("/api/admin/legal-pages");
            if (response.ok) {
                const data = await response.json();
                setPages(data);
            }
        } catch (error) {
            console.error("Failed to fetch pages:", error);
        } finally {
            setLoading(false);
        }
    };

    const createDefaultPages = async () => {
        setSaving("all");
        try {
            for (const page of defaultPages) {
                const exists = pages.find(p => p.slug === page.slug);
                if (!exists) {
                    await fetch("/api/admin/legal-pages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            slug: page.slug,
                            titleTr: page.titleTr,
                            titleEn: page.titleEn,
                            contentTr: "",
                            contentEn: "",
                            isActive: true,
                        }),
                    });
                }
            }
            await fetchPages();
        } catch (error) {
            console.error("Failed to create pages:", error);
        } finally {
            setSaving(null);
        }
    };

    const updatePage = async (page: LegalPage) => {
        setSaving(page.slug);
        try {
            await fetch(`/api/admin/legal-pages/${page.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(page),
            });
        } catch (error) {
            console.error("Failed to update page:", error);
        } finally {
            setSaving(null);
        }
    };

    const handleContentChange = (slug: string, field: "contentTr" | "contentEn", value: string) => {
        setPages(prev =>
            prev.map(p => (p.slug === slug ? { ...p, [field]: value } : p))
        );
    };

    const handleTitleChange = (slug: string, field: "titleTr" | "titleEn", value: string) => {
        setPages(prev =>
            prev.map(p => (p.slug === slug ? { ...p, [field]: value } : p))
        );
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#8CC63F]" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C3E50]">Sözleşme Metinleri</h1>
                    <p className="text-[#6B7280] mt-1">
                        Footer ve formlarda kullanılan yasal metinleri yönetin
                    </p>
                </div>
                {pages.length === 0 && (
                    <button
                        onClick={createDefaultPages}
                        disabled={saving === "all"}
                        className="flex items-center gap-2 px-4 py-2 bg-[#8CC63F] text-white rounded-lg hover:bg-[#7AB82F] transition-colors disabled:opacity-50"
                    >
                        {saving === "all" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                        Varsayılan Sayfaları Oluştur
                    </button>
                )}
            </div>

            {pages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                    <p className="text-[#6B7280] mb-4">Henüz sözleşme sayfası bulunmuyor</p>
                    <button
                        onClick={createDefaultPages}
                        disabled={saving === "all"}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8CC63F] text-white rounded-lg hover:bg-[#7AB82F] transition-colors disabled:opacity-50"
                    >
                        {saving === "all" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                        Varsayılan Sayfaları Oluştur
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Header */}
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() =>
                                    setExpandedPage(expandedPage === page.slug ? null : page.slug)
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-[#8CC63F]" />
                                    <div>
                                        <h3 className="font-semibold text-[#2C3E50]">
                                            {page.titleTr}
                                        </h3>
                                        <p className="text-sm text-[#6B7280]">/{page.slug}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${page.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {page.isActive ? "Aktif" : "Pasif"}
                                    </span>
                                    {expandedPage === page.slug ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            {expandedPage === page.slug && (
                                <div className="border-t border-gray-100 p-4">
                                    {/* Title Inputs */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Başlık (TR)
                                            </label>
                                            <input
                                                type="text"
                                                value={page.titleTr}
                                                onChange={(e) =>
                                                    handleTitleChange(page.slug, "titleTr", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Başlık (EN)
                                            </label>
                                            <input
                                                type="text"
                                                value={page.titleEn}
                                                onChange={(e) =>
                                                    handleTitleChange(page.slug, "titleEn", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Language Tabs */}
                                    <div className="flex gap-2 mb-4">
                                        <button
                                            onClick={() => setActiveTab("tr")}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "tr"
                                                    ? "bg-[#8CC63F] text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            🇹🇷 Türkçe
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("en")}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "en"
                                                    ? "bg-[#8CC63F] text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            🇬🇧 English
                                        </button>
                                    </div>

                                    {/* Rich Text Editor */}
                                    <div className="mb-4">
                                        {activeTab === "tr" ? (
                                            <RichTextEditor
                                                value={page.contentTr}
                                                onChange={(value) =>
                                                    handleContentChange(page.slug, "contentTr", value)
                                                }
                                            />
                                        ) : (
                                            <RichTextEditor
                                                value={page.contentEn}
                                                onChange={(value) =>
                                                    handleContentChange(page.slug, "contentEn", value)
                                                }
                                            />
                                        )}
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => updatePage(page)}
                                            disabled={saving === page.slug}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#8CC63F] text-white rounded-lg hover:bg-[#7AB82F] transition-colors disabled:opacity-50"
                                        >
                                            {saving === page.slug ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            Kaydet
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

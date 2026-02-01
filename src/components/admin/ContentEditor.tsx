"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface ContentItem {
    key: string;
    label: string;
    tr: string;
    en: string;
    type: "text" | "textarea";
}

interface ContentEditorProps {
    pageSlug: string;
    pageTitle: string;
    initialContent: ContentItem[];
}

export default function ContentEditor({
    pageSlug,
    pageTitle,
    initialContent,
}: ContentEditorProps) {
    const [content, setContent] = useState<ContentItem[]>(initialContent);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (
        key: string,
        lang: "tr" | "en",
        value: string
    ) => {
        setContent((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, [lang]: value } : item
            )
        );
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageSlug, content }),
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (error) {
            console.error("Save failed:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            {/* Sticky Save Button */}
            <div className="sticky top-16 z-20 bg-[#F3F4F6] -mx-6 px-6 py-4 mb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#2C3E50]">{pageTitle}</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#8CC63F] text-white font-semibold rounded-lg hover:bg-[#7ab233] transition-colors disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Kaydedildi!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Fields */}
            <div className="space-y-6">
                {content.map((item) => (
                    <div
                        key={item.key}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="font-semibold text-[#2C3E50] mb-4">{item.label}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Turkish */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                                    🇹🇷 Türkçe
                                </label>
                                {item.type === "textarea" ? (
                                    <textarea
                                        value={item.tr}
                                        onChange={(e) => handleChange(item.key, "tr", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={item.tr}
                                        onChange={(e) => handleChange(item.key, "tr", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all"
                                    />
                                )}
                            </div>

                            {/* English */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                                    🇬🇧 English
                                </label>
                                {item.type === "textarea" ? (
                                    <textarea
                                        value={item.en}
                                        onChange={(e) => handleChange(item.key, "en", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={item.en}
                                        onChange={(e) => handleChange(item.key, "en", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

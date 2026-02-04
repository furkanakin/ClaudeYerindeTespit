"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface ContentField {
    key: string;
    label: string;
    type: "input" | "textarea" | "richtext";
}

interface ContentEditorProps {
    pageSlug: string;
    pageTitle: string;
    fields: ContentField[];
}

export default function ContentEditor({
    pageSlug,
    pageTitle,
    fields,
}: ContentEditorProps) {
    const [content, setContent] = useState<Record<string, { tr: string; en: string }>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        loadContent();
    }, [pageSlug]);

    const loadContent = async () => {
        try {
            const response = await fetch(`/api/admin/content?pageSlug=${pageSlug}`);
            const data = await response.json();

            const contentMap: Record<string, { tr: string; en: string }> = {};
            fields.forEach((field) => {
                const existing = data.find((d: any) => d.key === field.key);
                contentMap[field.key] = existing
                    ? { tr: existing.tr, en: existing.en }
                    : { tr: "", en: "" };
            });
            setContent(contentMap);
        } catch (error) {
            console.error("Failed to load content:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pageSlug,
                    content: Object.entries(content).map(([key, value]) => ({
                        key,
                        tr: value.tr,
                        en: value.en,
                    })),
                }),
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save content:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateField = (key: string, lang: "tr" | "en", value: string) => {
        setContent((prev) => ({
            ...prev,
            [key]: { ...prev[key], [lang]: value },
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#8CC63F]" />
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Sticky Save Button */}
            <div className="sticky top-0 z-10 bg-[#F3F4F6] py-4 -mx-8 px-8 mb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2C3E50]">{pageTitle}</h1>
                        <p className="text-[#6B7280] text-sm mt-1">
                            İçerikleri düzenleyin ve kaydedin
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#8CC63F] hover:bg-[#7ab233] text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : saveSuccess ? (
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
            <div className="space-y-8">
                {fields.map((field) => (
                    <div
                        key={field.key}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="font-semibold text-[#2C3E50] mb-4">{field.label}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Turkish */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                                    🇹🇷 Türkçe
                                </label>
                                {field.type === "richtext" ? (
                                    <RichTextEditor
                                        value={content[field.key]?.tr || ""}
                                        onChange={(value) => updateField(field.key, "tr", value)}
                                    />
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        value={content[field.key]?.tr || ""}
                                        onChange={(e) => updateField(field.key, "tr", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={content[field.key]?.tr || ""}
                                        onChange={(e) => updateField(field.key, "tr", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all"
                                    />
                                )}
                            </div>

                            {/* English */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                                    🇬🇧 English
                                </label>
                                {field.type === "richtext" ? (
                                    <RichTextEditor
                                        value={content[field.key]?.en || ""}
                                        onChange={(value) => updateField(field.key, "en", value)}
                                    />
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        value={content[field.key]?.en || ""}
                                        onChange={(e) => updateField(field.key, "en", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={content[field.key]?.en || ""}
                                        onChange={(e) => updateField(field.key, "en", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none transition-all"
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

"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LegalPageClientProps {
    slug: string;
    locale: string;
    fallbackTitle: string;
    fallbackContent?: string;
}

interface LegalPageData {
    titleTr: string;
    titleEn: string;
    contentTr: string;
    contentEn: string;
}

export default function LegalPageClient({ slug, locale, fallbackTitle, fallbackContent = "" }: LegalPageClientProps) {
    const [page, setPage] = useState<LegalPageData | null>(null);
    const [loading, setLoading] = useState(true);
    const isEn = locale === "en";

    useEffect(() => {
        fetch(`/api/legal/${slug}`)
            .then(res => {
                if (res.ok) return res.json();
                return null;
            })
            .then(data => {
                if (data) setPage(data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [slug]);

    const title = page
        ? (isEn ? page.titleEn : page.titleTr)
        : fallbackTitle;

    const content = page
        ? (isEn ? page.contentEn : page.contentTr)
        : fallbackContent;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAF5] to-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">
                    {title}
                </h1>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-[#8CC63F]" />
                    </div>
                ) : content ? (
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-a:text-[#8CC63F] prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                ) : (
                    <div className="text-center py-12 text-[#6B7280]">
                        <p>{isEn ? "This page is being prepared." : "Bu sayfa hazırlanmaktadır."}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

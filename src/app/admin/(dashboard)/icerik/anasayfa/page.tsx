import prisma from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const defaultContent = [
    { key: "hero_title", label: "Ana Başlık", tr: "Yerinde Analiz", en: "On-Site Analysis", type: "text" as const },
    { key: "hero_subtitle", label: "Alt Başlık", tr: "Stratejik Danışmanlık", en: "Strategic Consulting", type: "text" as const },
    { key: "hero_description", label: "Açıklama", tr: "Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu", en: "An architecture and engineering-based consulting platform providing independent and unbiased information services", type: "textarea" as const },
    { key: "cta_button", label: "CTA Butonu", tr: "Hizmetlerimizi İnceleyin", en: "Explore Our Services", type: "text" as const },
    { key: "services_title", label: "Hizmetler Başlığı", tr: "Hizmetlerimiz", en: "Our Services", type: "text" as const },
    { key: "why_us_title", label: "Neden Biz Başlığı", tr: "Neden Yerinde Analiz?", en: "Why On-Site Analysis?", type: "text" as const },
];

export default async function AnasayfaIcerikPage() {
    const dbContent = await prisma.pageContent.findMany({
        where: { pageSlug: "anasayfa" },
    });

    const content = defaultContent.map((item) => {
        const dbItem = dbContent.find((c) => c.key === item.key);
        return {
            ...item,
            tr: dbItem?.tr || item.tr,
            en: dbItem?.en || item.en,
        };
    });

    return <ContentEditor pageSlug="anasayfa" pageTitle="Anasayfa İçerikleri" initialContent={content} />;
}

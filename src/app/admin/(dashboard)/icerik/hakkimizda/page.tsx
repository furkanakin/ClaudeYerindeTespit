import prisma from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const defaultContent = [
    { key: "page_title", label: "Sayfa Başlığı", tr: "Hakkımızda", en: "About Us", type: "text" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", tr: "Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu", en: "An architecture and engineering-based consulting platform providing independent and unbiased information services", type: "textarea" as const },
    { key: "story_title", label: "Hikaye Başlığı", tr: "Hikayemiz", en: "Our Story", type: "text" as const },
    { key: "story_content", label: "Hikaye İçeriği", tr: "Yerinde Analiz, gayrimenkul yatırımlarınızda doğru kararlar vermenize yardımcı olmak için kurulmuş bir danışmanlık platformudur.", en: "On-Site Analysis is a consulting platform established to help you make the right decisions in your real estate investments.", type: "textarea" as const },
    { key: "mission_title", label: "Misyon Başlığı", tr: "Misyonumuz", en: "Our Mission", type: "text" as const },
    { key: "mission_content", label: "Misyon İçeriği", tr: "Gayrimenkul yatırımcılarına bağımsız, tarafsız ve teknik açıdan kapsamlı değerlendirmeler sunmak.", en: "To provide real estate investors with independent, unbiased, and technically comprehensive evaluations.", type: "textarea" as const },
];

export default async function HakkimizdaIcerikPage() {
    const dbContent = await prisma.pageContent.findMany({
        where: { pageSlug: "hakkimizda" },
    });

    const content = defaultContent.map((item) => {
        const dbItem = dbContent.find((c) => c.key === item.key);
        return {
            ...item,
            tr: dbItem?.tr || item.tr,
            en: dbItem?.en || item.en,
        };
    });

    return <ContentEditor pageSlug="hakkimizda" pageTitle="Hakkımızda Sayfası" initialContent={content} />;
}

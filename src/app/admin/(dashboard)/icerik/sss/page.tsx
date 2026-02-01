import prisma from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const defaultContent = [
    { key: "page_title", label: "Sayfa Başlığı", tr: "Sıkça Sorulan Sorular", en: "Frequently Asked Questions", type: "text" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", tr: "Yerinde Analiz hakkında merak edilen her şey", en: "Everything you wonder about On-Site Analysis", type: "textarea" as const },
    { key: "cta_text", label: "CTA Metni", tr: "Sorunuzun cevabını bulamadınız mı?", en: "Couldn't find the answer to your question?", type: "text" as const },
    { key: "cta_button", label: "CTA Butonu", tr: "Bize Ulaşın", en: "Contact Us", type: "text" as const },
];

export default async function SSSIcerikPage() {
    const dbContent = await prisma.pageContent.findMany({
        where: { pageSlug: "sss" },
    });

    const content = defaultContent.map((item) => {
        const dbItem = dbContent.find((c) => c.key === item.key);
        return {
            ...item,
            tr: dbItem?.tr || item.tr,
            en: dbItem?.en || item.en,
        };
    });

    return <ContentEditor pageSlug="sss" pageTitle="SSS Sayfası" initialContent={content} />;
}

import prisma from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const defaultContent = [
    { key: "page_title", label: "Sayfa Başlığı", tr: "Paketlerimiz", en: "Our Packages", type: "text" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", tr: "İhtiyacınıza uygun paketi seçin, profesyonel danışmanlık hizmetimizden yararlanın", en: "Choose the package that suits your needs, benefit from our professional consulting service", type: "textarea" as const },
    { key: "package_1_title", label: "Ön Analiz Başlığı", tr: "Ön Analiz", en: "Pre-Analysis", type: "text" as const },
    { key: "package_1_desc", label: "Ön Analiz Açıklaması", tr: "Gayrimenkul hakkında hızlı bir ön değerlendirme", en: "Quick preliminary assessment about the property", type: "textarea" as const },
    { key: "package_2_title", label: "Yerinde Analiz Başlığı", tr: "Yerinde Analiz", en: "On-Site Analysis", type: "text" as const },
    { key: "package_2_desc", label: "Yerinde Analiz Açıklaması", tr: "Kapsamlı yerinde inceleme ve detaylı rapor", en: "Comprehensive on-site inspection and detailed report", type: "textarea" as const },
    { key: "package_3_title", label: "Premium Analiz Başlığı", tr: "Premium Analiz", en: "Premium Analysis", type: "text" as const },
    { key: "package_3_desc", label: "Premium Analiz Açıklaması", tr: "Kişiye özel danışmanlık ve kapsamlı hizmet", en: "Personalized consulting and comprehensive service", type: "textarea" as const },
    { key: "info_note", label: "Bilgi Notu", tr: "Muğla il sınırları içinde geçerlidir. Muğla dışındaki bölgeler için fiyatlar ayrıca belirlenir.", en: "Valid within Muğla province borders. Prices for areas outside Muğla are determined separately.", type: "textarea" as const },
];

export default async function PaketlerIcerikPage() {
    const dbContent = await prisma.pageContent.findMany({
        where: { pageSlug: "paketler" },
    });

    const content = defaultContent.map((item) => {
        const dbItem = dbContent.find((c) => c.key === item.key);
        return {
            ...item,
            tr: dbItem?.tr || item.tr,
            en: dbItem?.en || item.en,
        };
    });

    return <ContentEditor pageSlug="paketler" pageTitle="Paketler Sayfası" initialContent={content} />;
}

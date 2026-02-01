import prisma from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const defaultContent = [
    { key: "page_title", label: "Sayfa Başlığı", tr: "İletişim", en: "Contact", type: "text" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", tr: "Stratejik danışmanlık ve yerinde analiz hizmetlerimiz için talebinizi oluşturun, en kısa sürede sizinle iletişime geçelim.", en: "Submit your request for our strategic consulting and on-site analysis services, we will contact you as soon as possible.", type: "textarea" as const },
    { key: "sidebar_title", label: "Sidebar Başlığı", tr: "Bize Ulaşın", en: "Contact Us", type: "text" as const },
    { key: "sidebar_desc", label: "Sidebar Açıklaması", tr: "Sorularınız için aşağıdaki iletişim bilgilerini kullanabilir veya yanıdaki formu doldurarak talebinizi iletebilirsiniz.", en: "You can use the contact information below for your questions or submit your request by filling out the form next to it.", type: "textarea" as const },
    { key: "process_title", label: "Süreç Başlığı", tr: "Süreç Nasıl İşliyor?", en: "How Does the Process Work?", type: "text" as const },
    { key: "process_step_1", label: "1. Adım", tr: "Formu doldurun ve talebinizi iletin", en: "Fill out the form and submit your request", type: "text" as const },
    { key: "process_step_2", label: "2. Adım", tr: "Talebiniz 24 saat içerisinde değerlendirilir, gerekirse kısa görüşme yapılır (ücretsiz)", en: "Your request is evaluated within 24 hours, a brief meeting is held if necessary (free)", type: "text" as const },
    { key: "process_step_3", label: "3. Adım", tr: "Teklifiniz ve hizmet sözleşmesi onayınıza sunulur", en: "Your proposal and service agreement are submitted for your approval", type: "text" as const },
    { key: "process_step_4", label: "4. Adım", tr: "Onayınız ve ödemenin tamamlanmasıyla birlikte rapor süreci başlamış olur", en: "With your approval and payment completion, the report process begins", type: "text" as const },
];

export default async function IletisimIcerikPage() {
    const dbContent = await prisma.pageContent.findMany({
        where: { pageSlug: "iletisim" },
    });

    const content = defaultContent.map((item) => {
        const dbItem = dbContent.find((c) => c.key === item.key);
        return {
            ...item,
            tr: dbItem?.tr || item.tr,
            en: dbItem?.en || item.en,
        };
    });

    return <ContentEditor pageSlug="iletisim" pageTitle="İletişim Sayfası" initialContent={content} />;
}

import ContentEditor from "@/components/admin/ContentEditor";

const iletisimFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "contact_title", label: "İletişim Bölüm Başlığı", type: "input" as const },
    { key: "contact_description", label: "İletişim Açıklaması", type: "textarea" as const },
    { key: "process_title", label: "Süreç Başlığı", type: "input" as const },
];

export default function IletisimIcerikPage() {
    return <ContentEditor pageSlug="iletisim" pageTitle="İletişim İçerikleri" fields={iletisimFields} />;
}

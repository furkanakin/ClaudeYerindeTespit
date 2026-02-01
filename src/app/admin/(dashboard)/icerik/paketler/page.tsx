import ContentEditor from "@/components/admin/ContentEditor";

const paketlerFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "package1_title", label: "Ön Analiz - Başlık", type: "input" as const },
    { key: "package1_description", label: "Ön Analiz - Açıklama", type: "textarea" as const },
    { key: "package2_title", label: "Yerinde Analiz - Başlık", type: "input" as const },
    { key: "package2_description", label: "Yerinde Analiz - Açıklama", type: "textarea" as const },
    { key: "package3_title", label: "Premium Analiz - Başlık", type: "input" as const },
    { key: "package3_description", label: "Premium Analiz - Açıklama", type: "textarea" as const },
];

export default function PaketlerIcerikPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Paketler İçerikleri" fields={paketlerFields} />;
}

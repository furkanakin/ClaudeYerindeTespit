import ContentEditor from "@/components/admin/ContentEditor";

const sssFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "cta_text", label: "CTA Metni", type: "input" as const },
    { key: "cta_button", label: "CTA Buton Metni", type: "input" as const },
];

export default function SSSIcerikPage() {
    return <ContentEditor pageSlug="sss" pageTitle="SSS İçerikleri" fields={sssFields} />;
}

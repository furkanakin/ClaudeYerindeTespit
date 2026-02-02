import ContentEditor from "@/components/admin/ContentEditor";

const sssFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "input" as const },
    { key: "cta_text", label: "CTA - Metin", type: "input" as const },
    { key: "cta_button", label: "CTA - Buton Yazısı", type: "input" as const },
];

export default function SSSIcerikPage() {
    return <ContentEditor pageSlug="sss" pageTitle="SSS Sayfası İçerikleri" fields={sssFields} />;
}

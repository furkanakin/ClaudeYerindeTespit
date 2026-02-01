import ContentEditor from "@/components/admin/ContentEditor";

const hakkimizdaFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "story_title", label: "Hikaye Başlığı", type: "input" as const },
    { key: "story_content", label: "Hikaye İçeriği", type: "textarea" as const },
    { key: "mission_title", label: "Misyon Başlığı", type: "input" as const },
    { key: "mission_content", label: "Misyon İçeriği", type: "textarea" as const },
];

export default function HakkimizdaIcerikPage() {
    return <ContentEditor pageSlug="hakkimizda" pageTitle="Hakkımızda İçerikleri" fields={hakkimizdaFields} />;
}

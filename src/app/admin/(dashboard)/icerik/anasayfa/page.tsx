import ContentEditor from "@/components/admin/ContentEditor";

const anasayfaFields = [
    { key: "hero_title", label: "Ana Başlık", type: "input" as const },
    { key: "hero_subtitle", label: "Alt Başlık", type: "textarea" as const },
    { key: "hero_cta", label: "CTA Buton Metni", type: "input" as const },
    { key: "services_title", label: "Hizmetler Bölüm Başlığı", type: "input" as const },
    { key: "services_description", label: "Hizmetler Açıklama", type: "textarea" as const },
];

export default function AnasayfaIcerikPage() {
    return <ContentEditor pageSlug="anasayfa" pageTitle="Anasayfa İçerikleri" fields={anasayfaFields} />;
}

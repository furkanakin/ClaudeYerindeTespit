import ContentEditor from "@/components/admin/ContentEditor";

const anasayfaFields = [
    // Hero Section
    { key: "hero_location", label: "Hero - Konum (Muğla'da)", type: "input" as const },
    { key: "hero_title", label: "Hero - Ana Başlık", type: "textarea" as const },
    { key: "hero_highlight", label: "Hero - Vurgulanan Yazı", type: "input" as const },
    { key: "hero_desc1", label: "Hero - Açıklama 1", type: "textarea" as const },
    { key: "hero_desc2", label: "Hero - Açıklama 2", type: "textarea" as const },
    { key: "hero_cta", label: "Hero - CTA Buton", type: "input" as const },

    // Manifesto Section
    { key: "manifesto_text", label: "Manifesto - Ana Metin", type: "textarea" as const },

    // Why Us Section
    { key: "whyus_title", label: "Neden Biz - Bölüm Başlığı", type: "input" as const },
    { key: "whyus_item1_title", label: "Neden Biz - Kart 1 Başlık", type: "input" as const },
    { key: "whyus_item1_subtitle", label: "Neden Biz - Kart 1 Alt Başlık", type: "input" as const },
    { key: "whyus_item1_desc", label: "Neden Biz - Kart 1 Açıklama", type: "textarea" as const },
    { key: "whyus_item2_title", label: "Neden Biz - Kart 2 Başlık", type: "input" as const },
    { key: "whyus_item2_subtitle", label: "Neden Biz - Kart 2 Alt Başlık", type: "input" as const },
    { key: "whyus_item2_desc", label: "Neden Biz - Kart 2 Açıklama", type: "textarea" as const },
    { key: "whyus_item3_title", label: "Neden Biz - Kart 3 Başlık", type: "input" as const },
    { key: "whyus_item3_subtitle", label: "Neden Biz - Kart 3 Alt Başlık", type: "input" as const },
    { key: "whyus_item3_desc", label: "Neden Biz - Kart 3 Açıklama", type: "textarea" as const },

    // How We Work Section
    { key: "howwework_title", label: "Nasıl Çalışıyoruz - Başlık", type: "input" as const },
    { key: "howwework_subtitle", label: "Nasıl Çalışıyoruz - Alt Başlık", type: "textarea" as const },
    { key: "howwework_step1_title", label: "Nasıl Çalışıyoruz - Adım 1 Başlık", type: "input" as const },
    { key: "howwework_step1_desc", label: "Nasıl Çalışıyoruz - Adım 1 Açıklama", type: "textarea" as const },
    { key: "howwework_step2_title", label: "Nasıl Çalışıyoruz - Adım 2 Başlık", type: "input" as const },
    { key: "howwework_step2_desc", label: "Nasıl Çalışıyoruz - Adım 2 Açıklama", type: "textarea" as const },
    { key: "howwework_step3_title", label: "Nasıl Çalışıyoruz - Adım 3 Başlık", type: "input" as const },
    { key: "howwework_step3_desc", label: "Nasıl Çalışıyoruz - Adım 3 Açıklama", type: "textarea" as const },
];

export default function AnasayfaIcerikPage() {
    return <ContentEditor pageSlug="anasayfa" pageTitle="Anasayfa İçerikleri" fields={anasayfaFields} />;
}

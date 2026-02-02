import ContentEditor from "@/components/admin/ContentEditor";

const anasayfaFields = [
    // Hero Section
    { key: "hero_location", label: "Hero - Konum (Muğla'da)", type: "input" as const },
    { key: "hero_title_prefix", label: "Hero - Başlık Ön Kısmı", type: "input" as const },
    { key: "hero_title_highlight", label: "Hero - Vurgulanan Kısım", type: "input" as const },
    { key: "hero_title_suffix", label: "Hero - Başlık Son Kısmı", type: "input" as const },
    { key: "hero_desc1", label: "Hero - Açıklama 1", type: "textarea" as const },
    { key: "hero_desc2", label: "Hero - Açıklama 2", type: "textarea" as const },
    { key: "hero_cta", label: "Hero - CTA Buton Yazısı", type: "input" as const },

    // Manifesto Section
    { key: "manifesto_brand", label: "Manifesto - Marka Adı", type: "input" as const },
    { key: "manifesto_text1", label: "Manifesto - Metin 1 (marka sonrası)", type: "textarea" as const },
    { key: "manifesto_highlight", label: "Manifesto - Vurgulanan Kısım", type: "input" as const },
    { key: "manifesto_text2", label: "Manifesto - Metin 2 (vurgu sonrası)", type: "textarea" as const },

    // Why Us Section
    { key: "whyus_title_prefix", label: "Neden Biz - Başlık Ön Kısmı", type: "input" as const },
    { key: "whyus_title_highlight", label: "Neden Biz - Vurgulanan Kısım", type: "input" as const },
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
    { key: "howwework_title_prefix", label: "Nasıl Çalışıyoruz - Başlık Ön Kısmı", type: "input" as const },
    { key: "howwework_title_highlight", label: "Nasıl Çalışıyoruz - Vurgulanan Kısım", type: "input" as const },
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

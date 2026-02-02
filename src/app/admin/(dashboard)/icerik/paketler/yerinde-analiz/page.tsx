import ContentEditor from "@/components/admin/ContentEditor";

const yerindeAnalizFields = [
    // Basic Info
    { key: "pkg2_title", label: "Paket Başlığı", type: "input" as const },
    { key: "pkg2_subtitle", label: "Alt Başlık", type: "input" as const },
    { key: "pkg2_desc", label: "Kart Açıklaması", type: "textarea" as const },
    { key: "pkg2_modal_desc", label: "Modal Açıklaması (** ile bold)", type: "textarea" as const },
    { key: "pkg2_delivery", label: "Teslim Süresi", type: "input" as const },
    { key: "pkg2_price", label: "Fiyat", type: "input" as const },
    { key: "pkg2_base_price_note", label: "Baz Fiyat Notu", type: "input" as const },
    { key: "pkg2_footer_note", label: "Modal Alt Notu", type: "textarea" as const },

    // What Includes
    { key: "pkg2_includes_1_title", label: "Dahil 1 - Başlık", type: "input" as const },
    { key: "pkg2_includes_2_title", label: "Dahil 2 - Başlık (Saha Ziyareti)", type: "input" as const },
    { key: "pkg2_includes_2_detail1", label: "Saha - Detay 1", type: "textarea" as const },
    { key: "pkg2_includes_2_detail2", label: "Saha - Detay 2", type: "textarea" as const },
    { key: "pkg2_includes_2_detail3", label: "Saha - Detay 3", type: "input" as const },
    { key: "pkg2_includes_2_detail4", label: "Saha - Detay 4", type: "textarea" as const },
    { key: "pkg2_includes_2_detail5", label: "Saha - Detay 5", type: "input" as const },
    { key: "pkg2_includes_3_title", label: "Dahil 3 - Başlık", type: "input" as const },
    { key: "pkg2_includes_4_title", label: "Dahil 4 - Başlık", type: "input" as const },

    // For Whom
    { key: "pkg2_kimler_1", label: "Kimler İçin - 1", type: "textarea" as const },
    { key: "pkg2_kimler_2", label: "Kimler İçin - 2", type: "textarea" as const },
    { key: "pkg2_kimler_3", label: "Kimler İçin - 3", type: "textarea" as const },
    { key: "pkg2_kimler_4", label: "Kimler İçin - 4", type: "textarea" as const },

    // Zone Info
    { key: "pkg2_zone1", label: "Bölge 1 Bilgisi", type: "textarea" as const },
    { key: "pkg2_zone2", label: "Bölge 2 Bilgisi", type: "textarea" as const },
    { key: "pkg2_zone3", label: "Bölge 3 Bilgisi", type: "textarea" as const },
    { key: "pkg2_zone4", label: "Bölge 4 Bilgisi", type: "textarea" as const },

    // Add-ons
    { key: "pkg2_addons_title", label: "Ek Hizmetler Başlığı", type: "input" as const },
    { key: "pkg2_addon1_name", label: "Ek Hizmet 1 - Ad (Drone Temel)", type: "input" as const },
    { key: "pkg2_addon1_desc", label: "Ek Hizmet 1 - Açıklama", type: "input" as const },
    { key: "pkg2_addon2_name", label: "Ek Hizmet 2 - Ad (Drone Kapsamlı)", type: "input" as const },
    { key: "pkg2_addon2_desc", label: "Ek Hizmet 2 - Açıklama", type: "input" as const },
    { key: "pkg2_addon3_name", label: "Ek Hizmet 3 - Ad (Haritalama)", type: "input" as const },
    { key: "pkg2_addon3_desc", label: "Ek Hizmet 3 - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon4_name", label: "Ek Hizmet 4 - Ad (Ek Gayrimenkul)", type: "input" as const },
    { key: "pkg2_addon4_desc", label: "Ek Hizmet 4 - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon5_name", label: "Ek Hizmet 5 - Ad (Hızlı Teslimat)", type: "input" as const },
    { key: "pkg2_addon5_desc", label: "Ek Hizmet 5 - Açıklama", type: "input" as const },
    { key: "pkg2_addon5_price", label: "Ek Hizmet 5 - Fiyat", type: "input" as const },
];

export default function YerindeAnalizIcerikPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Yerinde Analiz Paketi İçerikleri" fields={yerindeAnalizFields} />;
}

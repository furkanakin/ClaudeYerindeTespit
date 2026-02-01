import ContentEditor from "@/components/admin/ContentEditor";

const yerindeAnalizFields = [
    // Temel Bilgiler
    { key: "pkg2_title", label: "Paket Başlığı", type: "input" as const },
    { key: "pkg2_subtitle", label: "Alt Başlık", type: "input" as const },
    { key: "pkg2_desc", label: "Kart Açıklaması", type: "textarea" as const },
    { key: "pkg2_modal_desc", label: "Modal Açıklaması", type: "textarea" as const },
    { key: "pkg2_delivery", label: "Teslim Süresi", type: "input" as const },
    { key: "pkg2_price", label: "Fiyat", type: "input" as const },
    { key: "pkg2_base_price_note", label: "Baz Fiyat Notu", type: "input" as const },
    { key: "pkg2_footer_note", label: "Modal Alt Notu", type: "textarea" as const },

    // Kimler İçin
    { key: "pkg2_kimler_1", label: "Kimler İçin - Madde 1", type: "textarea" as const },
    { key: "pkg2_kimler_2", label: "Kimler İçin - Madde 2", type: "textarea" as const },
    { key: "pkg2_kimler_3", label: "Kimler İçin - Madde 3", type: "textarea" as const },
    { key: "pkg2_kimler_4", label: "Kimler İçin - Madde 4", type: "textarea" as const },

    // Neler Dahil
    { key: "pkg2_includes_title1", label: "Dahil - 1. Başlık", type: "input" as const },
    { key: "pkg2_includes_title2", label: "Dahil - 2. Başlık (Saha Ziyareti)", type: "input" as const },
    { key: "pkg2_includes_detail2_1", label: "Saha Ziyareti - Detay 1", type: "input" as const },
    { key: "pkg2_includes_detail2_2", label: "Saha Ziyareti - Detay 2", type: "input" as const },
    { key: "pkg2_includes_detail2_3", label: "Saha Ziyareti - Detay 3", type: "input" as const },
    { key: "pkg2_includes_detail2_4", label: "Saha Ziyareti - Detay 4", type: "input" as const },
    { key: "pkg2_includes_detail2_5", label: "Saha Ziyareti - Detay 5", type: "input" as const },
    { key: "pkg2_includes_title3", label: "Dahil - 3. Başlık", type: "input" as const },
    { key: "pkg2_includes_title4", label: "Dahil - 4. Başlık", type: "input" as const },

    // Bölge Bilgileri
    { key: "pkg2_zone1", label: "Bölge 1 Açıklaması", type: "textarea" as const },
    { key: "pkg2_zone2", label: "Bölge 2 Açıklaması", type: "textarea" as const },
    { key: "pkg2_zone3", label: "Bölge 3 Açıklaması", type: "textarea" as const },
    { key: "pkg2_zone4", label: "Bölge 4 Açıklaması", type: "textarea" as const },

    // Ek Hizmetler
    { key: "pkg2_addons_title", label: "Ek Hizmetler Başlığı", type: "input" as const },
    { key: "pkg2_addon1_name", label: "Drone Temel - İsim", type: "input" as const },
    { key: "pkg2_addon1_desc", label: "Drone Temel - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon2_name", label: "Drone Kapsamlı - İsim", type: "input" as const },
    { key: "pkg2_addon2_desc", label: "Drone Kapsamlı - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon3_name", label: "Drone Haritalama - İsim", type: "input" as const },
    { key: "pkg2_addon3_desc", label: "Drone Haritalama - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon4_name", label: "Ek Gayrimenkul - İsim", type: "input" as const },
    { key: "pkg2_addon4_desc", label: "Ek Gayrimenkul - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon5_name", label: "Hızlı Teslimat - İsim", type: "input" as const },
    { key: "pkg2_addon5_desc", label: "Hızlı Teslimat - Açıklama", type: "textarea" as const },
    { key: "pkg2_addon5_price", label: "Hızlı Teslimat - Fiyat", type: "input" as const },
];

export default function YerindeAnalizPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Yerinde Analiz Paketi İçerikleri" fields={yerindeAnalizFields} />;
}

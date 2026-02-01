import ContentEditor from "@/components/admin/ContentEditor";

const onAnalizFields = [
    // Temel Bilgiler
    { key: "pkg1_title", label: "Paket Başlığı", type: "input" as const },
    { key: "pkg1_subtitle", label: "Alt Başlık", type: "input" as const },
    { key: "pkg1_desc", label: "Kart Açıklaması", type: "textarea" as const },
    { key: "pkg1_modal_desc", label: "Modal Açıklaması", type: "textarea" as const },
    { key: "pkg1_delivery", label: "Teslim Süresi", type: "input" as const },
    { key: "pkg1_price", label: "Fiyat", type: "input" as const },

    // Kimler İçin
    { key: "pkg1_kimler_1", label: "Kimler İçin - Madde 1", type: "textarea" as const },
    { key: "pkg1_kimler_2", label: "Kimler İçin - Madde 2", type: "textarea" as const },
    { key: "pkg1_kimler_3", label: "Kimler İçin - Madde 3", type: "textarea" as const },
    { key: "pkg1_kimler_4", label: "Kimler İçin - Madde 4", type: "textarea" as const },

    // Neler Dahil
    { key: "pkg1_includes_title1", label: "Dahil - 1. Başlık", type: "input" as const },
    { key: "pkg1_includes_detail1_1", label: "Dahil - 1. Detay 1", type: "input" as const },
    { key: "pkg1_includes_detail1_2", label: "Dahil - 1. Detay 2", type: "input" as const },
    { key: "pkg1_includes_title2", label: "Dahil - 2. Başlık", type: "input" as const },
    { key: "pkg1_includes_detail2_1", label: "Dahil - 2. Detay 1", type: "input" as const },
    { key: "pkg1_includes_title3", label: "Dahil - 3. Başlık", type: "input" as const },
    { key: "pkg1_includes_detail3_1", label: "Dahil - 3. Detay 1", type: "input" as const },

    // Ek Hizmetler
    { key: "pkg1_addons_title", label: "Ek Hizmetler Başlığı", type: "input" as const },
    { key: "pkg1_addon1_name", label: "Ek Hizmet 1 - İsim", type: "input" as const },
    { key: "pkg1_addon1_desc", label: "Ek Hizmet 1 - Açıklama", type: "textarea" as const },
    { key: "pkg1_addon1_price", label: "Ek Hizmet 1 - Fiyat", type: "input" as const },
    { key: "pkg1_addon2_name", label: "Ek Hizmet 2 - İsim", type: "input" as const },
    { key: "pkg1_addon2_desc", label: "Ek Hizmet 2 - Açıklama", type: "textarea" as const },
    { key: "pkg1_addon2_price", label: "Ek Hizmet 2 - Fiyat", type: "input" as const },
    { key: "pkg1_addon3_name", label: "Ek Hizmet 3 - İsim", type: "input" as const },
    { key: "pkg1_addon3_desc", label: "Ek Hizmet 3 - Açıklama", type: "textarea" as const },
    { key: "pkg1_addon3_price", label: "Ek Hizmet 3 - Fiyat", type: "input" as const },
];

export default function OnAnalizPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Ön Analiz Paketi İçerikleri" fields={onAnalizFields} />;
}

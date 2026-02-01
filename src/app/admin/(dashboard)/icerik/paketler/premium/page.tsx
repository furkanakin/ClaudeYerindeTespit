import ContentEditor from "@/components/admin/ContentEditor";

const premiumFields = [
    // Temel Bilgiler
    { key: "pkg3_title", label: "Paket Başlığı", type: "input" as const },
    { key: "pkg3_subtitle", label: "Alt Başlık", type: "input" as const },
    { key: "pkg3_desc", label: "Kart Açıklaması", type: "textarea" as const },
    { key: "pkg3_modal_desc", label: "Modal Açıklaması", type: "textarea" as const },
    { key: "pkg3_delivery", label: "Teslim Süresi", type: "input" as const },
    { key: "pkg3_price", label: "Fiyat", type: "input" as const },

    // Kimler İçin
    { key: "pkg3_kimler_1", label: "Kimler İçin - Madde 1", type: "textarea" as const },
    { key: "pkg3_kimler_2", label: "Kimler İçin - Madde 2", type: "textarea" as const },
    { key: "pkg3_kimler_3", label: "Kimler İçin - Madde 3", type: "textarea" as const },
    { key: "pkg3_kimler_4", label: "Kimler İçin - Madde 4", type: "textarea" as const },
    { key: "pkg3_kimler_5", label: "Kimler İçin - Madde 5", type: "textarea" as const },
    { key: "pkg3_kimler_6", label: "Kimler İçin - Madde 6", type: "textarea" as const },
    { key: "pkg3_kimler_7", label: "Kimler İçin - Madde 7", type: "textarea" as const },

    // Neler Dahil
    { key: "pkg3_includes_title1", label: "Dahil - 1. Başlık", type: "input" as const },
    { key: "pkg3_includes_title2", label: "Dahil - 2. Başlık", type: "input" as const },
    { key: "pkg3_includes_title3", label: "Dahil - 3. Başlık", type: "input" as const },
    { key: "pkg3_includes_title4", label: "Dahil - 4. Başlık", type: "input" as const },
    { key: "pkg3_includes_title5", label: "Dahil - 5. Başlık", type: "input" as const },

    // Ek Hizmetler
    { key: "pkg3_addons_title", label: "Danışmanlık ve Hizmetler Başlığı", type: "input" as const },
    { key: "pkg3_addon1_name", label: "Mimari Proje - İsim", type: "input" as const },
    { key: "pkg3_addon1_desc", label: "Mimari Proje - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon2_name", label: "Uygulama Kontrollüğü - İsim", type: "input" as const },
    { key: "pkg3_addon2_desc", label: "Uygulama Kontrollüğü - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon3_name", label: "3D Modelleme - İsim", type: "input" as const },
    { key: "pkg3_addon3_desc", label: "3D Modelleme - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon4_name", label: "İmar Danışmanlığı - İsim", type: "input" as const },
    { key: "pkg3_addon4_desc", label: "İmar Danışmanlığı - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon5_name", label: "Tadilat Proje - İsim", type: "input" as const },
    { key: "pkg3_addon5_desc", label: "Tadilat Proje - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon6_name", label: "Çoklu Gayrimenkul - İsim", type: "input" as const },
    { key: "pkg3_addon6_desc", label: "Çoklu Gayrimenkul - Açıklama", type: "textarea" as const },
];

export default function PremiumPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Premium Danışmanlık Paketi İçerikleri" fields={premiumFields} />;
}

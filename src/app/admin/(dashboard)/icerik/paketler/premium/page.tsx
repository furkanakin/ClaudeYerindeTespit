import ContentEditor from "@/components/admin/ContentEditor";

const premiumFields = [
    // Basic Info
    { key: "pkg3_title", label: "Paket Başlığı", type: "input" as const },
    { key: "pkg3_subtitle", label: "Alt Başlık", type: "input" as const },
    { key: "pkg3_desc", label: "Kart Açıklaması", type: "textarea" as const },
    { key: "pkg3_modal_desc", label: "Modal Açıklaması (** ile bold)", type: "textarea" as const },
    { key: "pkg3_delivery", label: "Teslim Süresi", type: "input" as const },
    { key: "pkg3_price", label: "Fiyat", type: "input" as const },

    // What Includes
    { key: "pkg3_includes_1_title", label: "Dahil 1 - Kişiye Özel Danışmanlık", type: "textarea" as const },
    { key: "pkg3_includes_2_title", label: "Dahil 2 - Derinleştirilmiş İncelemeler", type: "textarea" as const },
    { key: "pkg3_includes_3_title", label: "Dahil 3 - Planlama ve İmar", type: "textarea" as const },
    { key: "pkg3_includes_4_title", label: "Dahil 4 - Görüşmeler", type: "textarea" as const },
    { key: "pkg3_includes_5_title", label: "Dahil 5 - Mimari Tasarım", type: "textarea" as const },

    // For Whom
    { key: "pkg3_kimler_1", label: "Kimler İçin - 1", type: "textarea" as const },
    { key: "pkg3_kimler_2", label: "Kimler İçin - 2", type: "textarea" as const },
    { key: "pkg3_kimler_3", label: "Kimler İçin - 3", type: "textarea" as const },
    { key: "pkg3_kimler_4", label: "Kimler İçin - 4", type: "textarea" as const },
    { key: "pkg3_kimler_5", label: "Kimler İçin - 5", type: "textarea" as const },
    { key: "pkg3_kimler_6", label: "Kimler İçin - 6", type: "textarea" as const },
    { key: "pkg3_kimler_7", label: "Kimler İçin - 7", type: "textarea" as const },

    // Add-ons
    { key: "pkg3_addons_title", label: "Ek Hizmetler Başlığı", type: "input" as const },
    { key: "pkg3_addon1_name", label: "Ek Hizmet 1 - Ad (Mimari Proje)", type: "input" as const },
    { key: "pkg3_addon1_desc", label: "Ek Hizmet 1 - Açıklama", type: "input" as const },
    { key: "pkg3_addon2_name", label: "Ek Hizmet 2 - Ad (Uygulama Kontrol)", type: "input" as const },
    { key: "pkg3_addon2_desc", label: "Ek Hizmet 2 - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon3_name", label: "Ek Hizmet 3 - Ad (3D Modelleme)", type: "input" as const },
    { key: "pkg3_addon3_desc", label: "Ek Hizmet 3 - Açıklama", type: "input" as const },
    { key: "pkg3_addon4_name", label: "Ek Hizmet 4 - Ad (İmar Danışmanlık)", type: "input" as const },
    { key: "pkg3_addon4_desc", label: "Ek Hizmet 4 - Açıklama", type: "input" as const },
    { key: "pkg3_addon5_name", label: "Ek Hizmet 5 - Ad (Tadilat Yönetimi)", type: "input" as const },
    { key: "pkg3_addon5_desc", label: "Ek Hizmet 5 - Açıklama", type: "textarea" as const },
    { key: "pkg3_addon6_name", label: "Ek Hizmet 6 - Ad (Çoklu Karşılaştırma)", type: "input" as const },
    { key: "pkg3_addon6_desc", label: "Ek Hizmet 6 - Açıklama", type: "input" as const },
];

export default function PremiumIcerikPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Premium Danışmanlık Paketi İçerikleri" fields={premiumFields} />;
}

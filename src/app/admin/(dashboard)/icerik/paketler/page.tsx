import ContentEditor from "@/components/admin/ContentEditor";

const paketlerFields = [
    // Page Header
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "note_text", label: "Not - Ana Metin", type: "textarea" as const },
    { key: "note_detail", label: "Not - Detay Metni", type: "input" as const },
    { key: "note_contact", label: "Not - İletişim Linki", type: "input" as const },

    // UI Texts
    { key: "ui_what_includes", label: "UI - Neler İçerir Başlığı", type: "input" as const },
    { key: "ui_for_whom", label: "UI - Kimler İçin Başlığı", type: "input" as const },
    { key: "ui_view_package", label: "UI - Paketi İncele Butonu", type: "input" as const },
    { key: "ui_popular_badge", label: "UI - Popüler Rozet", type: "input" as const },
    { key: "ui_more_features", label: "UI - Daha Fazla Özellik", type: "input" as const },
    { key: "ui_package_configurator", label: "UI - Paket Yapılandırıcı", type: "input" as const },
    { key: "ui_delivery_time", label: "UI - Teslim Süresi", type: "input" as const },
    { key: "ui_base_price", label: "UI - Baz Fiyat", type: "input" as const },
    { key: "ui_extra_services", label: "UI - Ek Hizmetler", type: "input" as const },
    { key: "ui_total_estimated", label: "UI - Toplam Tahmini Tutar", type: "input" as const },
    { key: "ui_get_quote", label: "UI - Teklif Alın", type: "input" as const },
    { key: "ui_based_on_scope", label: "UI - Kapsama Göre", type: "input" as const },
    { key: "ui_no_addons", label: "UI - Ek Hizmet Yok", type: "input" as const },
];

export default function PaketlerIcerikPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Paketler Sayfası - Genel" fields={paketlerFields} />;
}

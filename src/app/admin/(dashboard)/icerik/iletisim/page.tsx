import ContentEditor from "@/components/admin/ContentEditor";

const iletisimFields = [
    // Page Header
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },

    // Contact Info
    { key: "reach_us_title", label: "Bize Ulaşın - Başlık", type: "input" as const },
    { key: "reach_us_desc", label: "Bize Ulaşın - Açıklama", type: "textarea" as const },
    { key: "email_label", label: "E-posta - Etiket", type: "input" as const },
    { key: "email_value", label: "E-posta - Değer", type: "input" as const },
    { key: "location_label", label: "Konum - Etiket", type: "input" as const },
    { key: "location_value", label: "Konum - Değer", type: "textarea" as const },
    { key: "hours_label", label: "Çalışma Saatleri - Etiket", type: "input" as const },
    { key: "hours_value", label: "Çalışma Saatleri - Değer", type: "input" as const },

    // Process
    { key: "process_title", label: "Süreç - Başlık", type: "input" as const },
    { key: "process_step1", label: "Süreç - Adım 1", type: "input" as const },
    { key: "process_step2", label: "Süreç - Adım 2", type: "textarea" as const },
    { key: "process_step3", label: "Süreç - Adım 3", type: "input" as const },
    { key: "process_step4", label: "Süreç - Adım 4", type: "textarea" as const },
];

export default function IletisimIcerikPage() {
    return <ContentEditor pageSlug="iletisim" pageTitle="İletişim Sayfası İçerikleri" fields={iletisimFields} />;
}

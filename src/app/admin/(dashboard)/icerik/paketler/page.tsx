import ContentEditor from "@/components/admin/ContentEditor";

const paketlerFields = [
    // Page Header
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },

    // Ön Analiz Package
    { key: "pkg1_title", label: "Paket 1 - Başlık (Ön Analiz)", type: "input" as const },
    { key: "pkg1_subtitle", label: "Paket 1 - Alt Başlık", type: "input" as const },
    { key: "pkg1_desc", label: "Paket 1 - Kart Açıklaması", type: "textarea" as const },
    { key: "pkg1_modal_desc", label: "Paket 1 - Modal Açıklaması", type: "textarea" as const },
    { key: "pkg1_delivery", label: "Paket 1 - Teslim Süresi", type: "input" as const },
    { key: "pkg1_price", label: "Paket 1 - Fiyat", type: "input" as const },

    // Yerinde Analiz Package
    { key: "pkg2_title", label: "Paket 2 - Başlık (Yerinde Analiz)", type: "input" as const },
    { key: "pkg2_subtitle", label: "Paket 2 - Alt Başlık", type: "input" as const },
    { key: "pkg2_desc", label: "Paket 2 - Kart Açıklaması", type: "textarea" as const },
    { key: "pkg2_modal_desc", label: "Paket 2 - Modal Açıklaması", type: "textarea" as const },
    { key: "pkg2_delivery", label: "Paket 2 - Teslim Süresi", type: "input" as const },
    { key: "pkg2_price", label: "Paket 2 - Fiyat", type: "input" as const },

    // Premium Package
    { key: "pkg3_title", label: "Paket 3 - Başlık (Premium)", type: "input" as const },
    { key: "pkg3_subtitle", label: "Paket 3 - Alt Başlık", type: "input" as const },
    { key: "pkg3_desc", label: "Paket 3 - Kart Açıklaması", type: "textarea" as const },
    { key: "pkg3_modal_desc", label: "Paket 3 - Modal Açıklaması", type: "textarea" as const },
    { key: "pkg3_delivery", label: "Paket 3 - Teslim Süresi", type: "input" as const },
    { key: "pkg3_price", label: "Paket 3 - Fiyat", type: "input" as const },
];

export default function PaketlerIcerikPage() {
    return <ContentEditor pageSlug="paketler" pageTitle="Paketler İçerikleri" fields={paketlerFields} />;
}

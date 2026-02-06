import ContentEditor from "@/components/admin/ContentEditor";

const paketModalFields = [
    { key: "packageConfiguratorText", label: "Modal Başlığı (Paket Yapılandırıcı)", type: "input" as const },
    { key: "deliveryTimeLabel", label: "Teslim Süresi Etiketi", type: "input" as const },
    { key: "forWhomText", label: "Kimler İçin Başlığı", type: "input" as const },
    { key: "basePriceText", label: "Baz Fiyat Etiketi", type: "input" as const },
    { key: "extraServicesText", label: "Ek Hizmetler Etiketi", type: "input" as const },
    { key: "totalEstimatedText", label: "Toplam Tahmini Tutar Etiketi", type: "input" as const },
    { key: "getQuoteText", label: "Teklif Al Butonu Metni", type: "input" as const },
    { key: "basedOnScopeText", label: "Kapsama Göre Metni", type: "input" as const },
    { key: "noAddonsText", label: "Ek Hizmet Yok Mesajı", type: "input" as const },
    { key: "taxLabel", label: "Vergi Etiketi (KDV/VAT)", type: "input" as const },
];

export default function PaketModalIcerikPage() {
    return <ContentEditor pageSlug="paket-modal" pageTitle="Paket Modalı Metinleri" fields={paketModalFields} />;
}

import ContentEditor from "@/components/admin/ContentEditor";

const iletisimFields = [
    { key: "page_title", label: "Sayfa Başlığı", type: "input" as const },
    { key: "page_subtitle", label: "Sayfa Alt Başlığı", type: "textarea" as const },
    { key: "form_title", label: "Form Başlığı", type: "input" as const },
    { key: "form_subtitle", label: "Form Alt Başlığı", type: "textarea" as const },
    { key: "address_title", label: "Adres Etiketi", type: "input" as const },
    { key: "address_value", label: "Adres Değeri", type: "textarea" as const },
    { key: "email_title", label: "E-posta Etiketi", type: "input" as const },
    { key: "phone_title", label: "Telefon Etiketi", type: "input" as const },
];

export default function IletisimIcerikPage() {
    return <ContentEditor pageSlug="iletisim" pageTitle="İletişim İçerikleri" fields={iletisimFields} />;
}

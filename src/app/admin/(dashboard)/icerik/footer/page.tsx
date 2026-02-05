import ContentEditor from "@/components/admin/ContentEditor";

const footerFields = [
    { key: "description", label: "Açıklama Metni", type: "textarea" as const },
    { key: "tagline", label: "Slogan (Yeşil İtalik Yazı)", type: "input" as const },
    { key: "email", label: "E-posta Adresi", type: "input" as const },
    { key: "address", label: "Fiziksel Adres", type: "textarea" as const },
    { key: "quickLinks", label: "Hızlı Erişim Başlığı", type: "input" as const },
    { key: "contact", label: "İletişim Başlığı", type: "input" as const },
    { key: "rights", label: "Telif Hakkı Metni", type: "input" as const },
    { key: "privacy", label: "Gizlilik Politikası Linki Metni", type: "input" as const },
    { key: "terms", label: "Kullanım Koşulları Linki Metni", type: "input" as const },
];

export default function FooterIcerikPage() {
    return <ContentEditor pageSlug="footer" pageTitle="Footer İçerikleri" fields={footerFields} />;
}

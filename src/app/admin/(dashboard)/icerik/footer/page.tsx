import ContentEditor from "@/components/admin/ContentEditor";

const footerFields = [
    { key: "copyright", label: "Telif Hakkı Metni", type: "input" as const },
    { key: "privacy", label: "Gizlilik Politikası Linki", type: "input" as const },
    { key: "terms", label: "Kullanım Koşulları Linki", type: "input" as const },
    { key: "tagline", label: "Slogan", type: "input" as const },
];

export default function FooterIcerikPage() {
    return <ContentEditor pageSlug="footer" pageTitle="Footer İçerikleri" fields={footerFields} />;
}

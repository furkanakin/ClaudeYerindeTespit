import ContentEditor from "@/components/admin/ContentEditor";

const navbarFields = [
    { key: "home", label: "Ana Sayfa Linki", type: "input" as const },
    { key: "about", label: "Hakkımızda Linki", type: "input" as const },
    { key: "packages", label: "Paketler Linki", type: "input" as const },
    { key: "faq", label: "SSS Linki", type: "input" as const },
    { key: "contact", label: "İletişim Linki", type: "input" as const },
];

export default function NavbarIcerikPage() {
    return <ContentEditor pageSlug="navbar" pageTitle="Navbar İçerikleri" fields={navbarFields} />;
}

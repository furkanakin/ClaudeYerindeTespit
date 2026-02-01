"use client";

import { useParams } from "next/navigation";
import ContentEditor from "@/components/admin/ContentEditor";

const pageTitles: Record<string, string> = {
    anasayfa: "Anasayfa İçerikleri",
    hakkimizda: "Hakkımızda Sayfası",
    paketler: "Paketler / Hizmetler",
    sss: "Sıkça Sorulan Sorular",
    iletisim: "İletişim Bilgileri",
};

export default function AdminContentPage() {
    const params = useParams();
    const page = params.page as string;

    return (
        <ContentEditor
            pageSlug={page}
            title={pageTitles[page] || `${page.charAt(0).toUpperCase() + page.slice(1)} İçerikleri`}
        />
    );
}

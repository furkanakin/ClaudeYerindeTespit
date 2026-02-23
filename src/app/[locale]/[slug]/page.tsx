import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "@/lib/translations";

interface LegalPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

const slugTitles: Record<string, { tr: string; en: string }> = {
    "kullanim-kosullari": { tr: "Kullanım Koşulları", en: "Terms of Use" },
    "cerez-aydinlatma": { tr: "Çerez Aydınlatma Metni", en: "Cookie Policy" },
    "aydinlatma": { tr: "Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni", en: "Privacy Notice" },
    "ilgili-kisi-basvuru": { tr: "İlgili Kişi Başvuru Formu", en: "Data Subject Request Form" },
    "iletisim-aydinlatma": { tr: "İletişim Formu Aydınlatma Metni", en: "Contact Form Privacy Notice" },
    "ticari-ileti": { tr: "Elektronik Ticari İleti Aydınlatma ve Açık Rıza Metni", en: "Commercial Electronic Message Consent" },
};

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const isEn = locale === "en";
    const defaultTitle = slugTitles[slug]?.[isEn ? "en" : "tr"] || slug;

    try {
        const page = await prisma.legalPage.findUnique({ where: { slug } });
        const title = page ? (isEn ? page.titleEn : page.titleTr) : defaultTitle;
        return {
            title: `${title} | Yerinde Analiz`,
        };
    } catch {
        return {
            title: `${defaultTitle} | Yerinde Analiz`,
        };
    }
}

export default async function LegalPage({ params }: LegalPageProps) {
    const { locale, slug } = await params;
    const isEn = locale === "en";

    let page;
    try {
        page = await prisma.legalPage.findUnique({
            where: { slug },
        });
    } catch {
        page = null;
    }

    if (!page || !page.isActive) {
        notFound();
    }

    const title = isEn ? page.titleEn : page.titleTr;
    const content = isEn ? page.contentEn : page.contentTr;

    const navbarTranslations = await getTranslations("navbar", locale);
    const footerTranslations = await getTranslations("footer", locale);

    return (
        <>
            <Navbar locale={locale} translations={navbarTranslations} />
            <main className="min-h-screen bg-gradient-to-b from-[#F8FAF5] to-white pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">
                        {title}
                    </h1>
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-a:text-[#8CC63F] prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </main>
            <Footer locale={locale} translations={footerTranslations} />
        </>
    );
}

// Generate static params for common legal pages
export async function generateStaticParams() {
    const slugs = Object.keys(slugTitles);
    const locales = ["tr", "en"];

    return locales.flatMap(locale =>
        slugs.map(slug => ({
            locale,
            slug,
        }))
    );
}

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialButtons from "@/components/ui/SocialButtons";
import { getTranslations } from "@/lib/translations";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Fetch translations for Navbar and Footer
    const navbarTranslations = await getTranslations("navbar", locale);
    const footerTranslations = await getTranslations("footer", locale);

    return (
        <>
            <Navbar locale={locale} translations={navbarTranslations} />
            <main>{children}</main>
            <Footer locale={locale} translations={footerTranslations} />
            <SocialButtons />
        </>
    );
}

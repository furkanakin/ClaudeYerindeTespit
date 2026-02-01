import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialButtons from "@/components/ui/SocialButtons";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
            <SocialButtons />
        </>
    );
}

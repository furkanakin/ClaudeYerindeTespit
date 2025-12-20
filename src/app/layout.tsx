import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Yerinde Analiz | Muğla Gayrimenkul Danışmanlığı",
  description:
    "Muğla'da gayrimenkul yatırımlarınız için bağımsız, teknik ve detaylı incelemeler. Arazi ve konut analizinde profesyonel danışmanlık hizmeti.",
  keywords: [
    "gayrimenkul analizi",
    "muğla arazi",
    "konut değerlendirme",
    "imar analizi",
    "yerinde inceleme",
    "gayrimenkul danışmanlık",
  ],
  authors: [{ name: "Yerinde Analiz" }],
  openGraph: {
    title: "Yerinde Analiz | Muğla Gayrimenkul Danışmanlığı",
    description:
      "Muğla'da gayrimenkul yatırımlarınız için bağımsız, teknik ve detaylı incelemeler.",
    url: "https://yerindeanaliz.com",
    siteName: "Yerinde Analiz",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

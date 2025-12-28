import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

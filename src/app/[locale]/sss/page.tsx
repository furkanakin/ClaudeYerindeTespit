import { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import Accordion from "@/components/faq/Accordion";
import { faqs as staticFaqs } from "@/lib/data/faq";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Yerinde Analiz",
  description:
    "Yerinde Analiz hizmetleri hakkında merak edilen sorular ve cevapları. Gayrimenkul danışmanlığı hakkında bilmeniz gerekenler.",
};

export default async function SSSPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations("sss", locale);

  const t = (key: string, fallback: string) => translations[key] || fallback;

  // DB'den soruları çek
  const dbFaqs = await prisma.faq.findMany({
    orderBy: { order: "asc" }
  });

  // Eğer DB boşsa statik veriyi kullan, değilse DB'den geleni map'le
  const displayFaqs = dbFaqs.length > 0
    ? dbFaqs.map((f: any) => ({
      id: f.id,
      question: f.questionTr,
      answer: f.answerTr,
      questionEn: f.questionEn,
      answerEn: f.answerEn
    }))
    : staticFaqs;

  return (
    <LanguageProvider locale={locale} translations={translations}>
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("page_title", "Sıkça Sorulan Sorular")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t("page_subtitle", "Yerinde Analiz hakkında merak edilen her şey")}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Accordion items={displayFaqs} locale={locale} translations={translations} />

              {/* Contact CTA */}
              <div className="mt-12 text-center">
                <p className="text-[#6B7280] mb-4">
                  {t("cta_text", locale === "en" ? "Couldn't find the answer to your question?" : "Sorunuzun cevabını bulamadınız mı?")}
                </p>
                <Link href={`/${locale}/iletisim`}>
                  <Button variant="outline">
                    {t("cta_button", locale === "en" ? "Contact Us" : "Bize Ulaşın")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
}

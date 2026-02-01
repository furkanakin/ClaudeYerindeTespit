import { Metadata } from "next";
import Accordion from "@/components/faq/Accordion";
import { faqs } from "@/lib/data/faq";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Yerinde Analiz",
  description:
    "Yerinde Analiz hizmetleri hakkında merak edilen sorular ve cevapları. Gayrimenkul danışmanlığı hakkında bilmeniz gerekenler.",
};

export default function SSSPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Yerinde Analiz hakkında merak edilen her şey
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-[#6B7280] mb-4">
                Sorunuzun cevabını bulamadınız mı?
              </p>
              <Link href="/iletisim">
                <Button variant="outline">Bize Ulaşın</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

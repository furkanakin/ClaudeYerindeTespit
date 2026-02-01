import { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Paketler | Yerinde Analiz",
  description:
    "İhtiyacınıza en uygun gayrimenkul analiz paketini seçin. Ön Analiz, Yerinde Analiz ve Premium Danışmanlık seçenekleri ile yanınızdayız.",
};

export default async function PaketlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("paketler", locale);

  return (
    <div className="pt-20">
      <PackagesClient t={t} locale={locale} />
    </div>
  );
}

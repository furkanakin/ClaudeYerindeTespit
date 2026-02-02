import { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import { LanguageProvider } from "@/lib/LanguageContext";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Yerinde Analiz",
  description:
    "Yerinde Analiz ekibi ile iletişime geçin. Gayrimenkul danışmanlığı talepleriniz için formu doldurun veya doğrudan bizimle iletişime geçin.",
};

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations("iletisim", locale);

  const t = (key: string, fallback: string) => translations[key] || fallback;

  const contactInfo = [
    {
      icon: Mail,
      title: t("email_label", locale === "en" ? "Email" : "E-posta"),
      content: t("email_value", "info@yerindeanaliz.com"),
      href: "mailto:info@yerindeanaliz.com",
    },
    {
      icon: MapPin,
      title: t("location_label", locale === "en" ? "Location" : "Konum"),
      content: t("location_value", "Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla"),
      href: null,
    },
    {
      icon: Clock,
      title: t("hours_label", locale === "en" ? "Working Hours" : "Çalışma Saatleri"),
      content: t("hours_value", locale === "en" ? "Weekdays 09:00 - 18:00" : "Hafta içi 09:00 - 18:00"),
      href: null,
    },
  ];

  return (
    <LanguageProvider locale={locale} translations={translations}>
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("page_title", "İletişim")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t("page_subtitle", "Stratejik danışmanlık ve yerinde analiz hizmetlerimiz için talebinizi oluşturun, en kısa sürede sizinle iletişime geçelim.")}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
                  {t("reach_us_title", locale === "en" ? "Reach Us" : "Bize Ulaşın")}
                </h2>
                <p className="text-[#6B7280] mb-8">
                  {t("reach_us_desc", locale === "en" ? "You can use the contact information below for your questions or submit your request by filling out the form." : "Sorularınız için aşağıdaki iletişim bilgilerini kullanabilir veya yanıdaki formu doldurarak talebinizi iletebilirsiniz.")}
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8CC63F]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-[#8CC63F]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2C3E50]">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#6B7280] hover:text-[#8CC63F] transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-[#6B7280]">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info - Process Steps */}
                <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
                  <h3 className="font-semibold text-[#2C3E50] mb-3">
                    {t("process_title", locale === "en" ? "How Does the Process Work?" : "Süreç Nasıl İşliyor?")}
                  </h3>
                  <ol className="space-y-3 text-sm text-[#6B7280]">
                    {[1, 2, 3, 4].map((step) => (
                      <li key={step} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#8CC63F]/10 text-[#8CC63F] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {step}
                        </span>
                        {t(`process_step${step}`, {
                          1: "Formu doldurun ve talebinizi iletin",
                          2: "Talebiniz 24 saat içerisinde değerlendirilir, gerekirse kısa görüşme yapılır (ücretsiz)",
                          3: "Teklifiniz ve hizmet sözleşmesi onayınıza sunulur",
                          4: "Onayınız ve ödemenin tamamlanmasıyla birlikte rapor süreci başlamış olur"
                        }[step as 1 | 2 | 3 | 4] || "")}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
}

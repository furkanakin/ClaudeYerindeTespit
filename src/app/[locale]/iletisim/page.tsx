import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getTranslations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "İletişim | Yerinde Analiz",
  description:
    "Yerinde Analiz ile iletişime geçin. Stratejik gayrimenkul danışmanlığı ve yerinde analiz hizmetlerimiz için bize ulaşın.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+90 (542) 238 43 45",
    href: "tel:+905422384345",
  },
  {
    icon: Mail,
    title: "E-posta",
    content: "info@yerindeanaliz.com",
    href: "mailto:info@yerindeanaliz.com",
  },
  {
    icon: MapPin,
    title: "Adres",
    content: "Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla",
    href: "https://maps.google.com/?q=Akarca+Mah.+Mustafa+Kemal+Bulvarı+No:158A+Fethiye/Muğla",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    content: "Pazartesi - Cumartesi: 09:00 - 18:00",
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("iletisim", locale);

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.header_title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-center">
            {t.header_description}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                {t.info_title}
              </h2>
              <p className="text-[#6B7280] mb-12 text-lg">
                {t.info_description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex flex-col gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-[#8CC63F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3E50] mb-1">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.title === "Adres" ? "_blank" : undefined}
                          rel={
                            info.title === "Adres"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-[#6B7280] hover:text-[#8CC63F] transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-[#6B7280]">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder or Simple Info */}
              <div className="mt-12 p-1 rounded-2xl bg-gray-100 overflow-hidden shadow-inner">
                <div className="aspect-video w-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF]">
                  <MapPin className="w-12 h-12 mb-2" />
                  {/* Real map integration can go here */}
                </div>
              </div>
            </div>

            {/* Contact Form Container */}
            <div className="lg:sticky lg:top-32">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

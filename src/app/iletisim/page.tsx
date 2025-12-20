import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Yerinde Analiz",
  description:
    "Yerinde Analiz ekibi ile iletişime geçin. Gayrimenkul danışmanlığı talepleriniz için formu doldurun veya doğrudan bizimle iletişime geçin.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "E-posta",
    content: "info@yerindeanaliz.com",
    href: "mailto:info@yerindeanaliz.com",
  },
  {
    icon: MapPin,
    title: "Konum",
    content: "Muğla, Türkiye",
    href: null,
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    content: "Hafta içi 09:00 - 18:00",
    href: null,
  },
];

export default function IletisimPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-[#0D9488] to-[#0F766E]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Gayrimenkul danışmanlığı talepleriniz için formu doldurun,
            size en kısa sürede dönüş yapalım
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">
                Bize Ulaşın
              </h2>
              <p className="text-[#6B7280] mb-8">
                Sorularınız için aşağıdaki iletişim bilgilerini kullanabilir veya
                yanıdaki formu doldurarak talebinizi iletebilirsiniz.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#6B7280] hover:text-[#0D9488] transition-colors"
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

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-[#111827] mb-3">
                  Süreç Nasıl İşliyor?
                </h3>
                <ol className="space-y-3 text-sm text-[#6B7280]">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    Formu doldurun ve talebinizi iletin
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    Talebiniz değerlendirilir, gerekirse kısa görüşme yapılır
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    Teklifiniz ve hizmet sözleşmesi onayınıza sunulur
                  </li>
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
  );
}

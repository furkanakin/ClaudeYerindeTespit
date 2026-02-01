import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | Yerinde Analiz",
    description: "Yerinde Analiz gizlilik politikası ve veri koruma ilkeleri.",
};

export default function GizlilikPage() {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Gizlilik Politikası
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto text-center">
                        Verilerinizin güvenliği bizim için önemlidir
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none text-[#4B5563]">
                        <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">1. Giriş</h2>
                        <p>
                            <strong>Yerinde Analiz</strong> olarak, web sitemizi ziyaret eden kullanıcılarımızın ve
                            hizmetlerimizden yararlanan müşterilerimizin gizliliğine saygı gösteriyoruz. Bu gizlilik
                            politikası, kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, korunduğunu ve
                            paylaşıldığını açıklamaktadır.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">2. Toplanan Bilgiler</h2>
                        <p>Web sitemizi kullandığınızda aşağıdaki bilgiler toplanabilir:</p>

                        <h3 className="text-xl font-semibold text-[#2C3E50] mt-6 mb-3">2.1 Sağladığınız Bilgiler</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>İletişim formu doldururken verdiğiniz ad, soyad, e-posta ve telefon bilgileri</li>
                            <li>Talep ettiğiniz hizmetle ilgili gayrimenkul bilgileri</li>
                            <li>E-posta veya telefon yoluyla ilettiğiniz bilgiler</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-[#2C3E50] mt-6 mb-3">2.2 Otomatik Toplanan Bilgiler</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>IP adresi</li>
                            <li>Tarayıcı türü ve sürümü</li>
                            <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                            <li>Cihaz bilgileri</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
                        <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Talep ettiğiniz hizmetleri sunmak</li>
                            <li>Sizinle iletişim kurmak</li>
                            <li>Web sitemizi geliştirmek</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">4. Bilgi Güvenliği</h2>
                        <p>
                            Kişisel bilgilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemler alıyoruz.
                            Web sitemiz SSL sertifikası ile korunmaktadır. Ancak, internet üzerinden veri iletiminin
                            tamamen güvenli olduğu garanti edilemez.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">5. Çerezler (Cookies)</h2>
                        <p>
                            Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler,
                            tarayıcınız tarafından bilgisayarınızda saklanan küçük metin dosyalarıdır. Tarayıcı
                            ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda web sitemizin
                            bazı özellikleri düzgün çalışmayabilir.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">6. Üçüncü Taraf Bağlantıları</h2>
                        <p>
                            Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik
                            uygulamalarından sorumlu değiliz. Bu siteleri ziyaret etmeden önce gizlilik politikalarını
                            incelemenizi öneririz.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">7. Bilgi Paylaşımı</h2>
                        <p>
                            Kişisel bilgilerinizi, açık izniniz olmadan üçüncü taraflarla pazarlama amacıyla paylaşmıyoruz.
                            Bilgileriniz yalnızca aşağıdaki durumlarda paylaşılabilir:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Yasal zorunluluk halinde</li>
                            <li>Hizmet sunumu için gerekli iş ortaklarımızla (gizlilik sözleşmesi kapsamında)</li>
                            <li>Sizin açık onayınız ile</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">8. Veri Saklama</h2>
                        <p>
                            Kişisel verilerinizi, hizmetlerimizi sunmak için gerekli olan süre boyunca ve yasal
                            yükümlülüklerimizi yerine getirmek için gerekli olan süre boyunca saklıyoruz.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">9. Haklarınız</h2>
                        <p>
                            Kişisel verilerinizle ilgili haklarınız hakkında detaylı bilgi için{" "}
                            <a href="/kvkk" className="text-[#8CC63F] hover:underline font-medium">
                                KVKK Aydınlatma Metni
                            </a>
                            'ni inceleyebilirsiniz.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">10. İletişim</h2>
                        <p>
                            Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <ul className="list-none pl-0 mt-4 space-y-2">
                            <li><strong>E-posta:</strong> info@yerindeanaliz.com</li>
                            <li><strong>Adres:</strong> Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">11. Değişiklikler</h2>
                        <p>
                            Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler web sitemizde
                            yayınlandığı anda yürürlüğe girer. Önemli değişiklikler olması durumunda sizi
                            bilgilendireceğiz.
                        </p>

                        <p className="mt-8 text-sm text-[#9CA3AF]">
                            Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

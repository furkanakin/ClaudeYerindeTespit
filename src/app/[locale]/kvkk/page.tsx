import { Metadata } from "next";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | Yerinde Analiz",
    description: "Yerinde Analiz kişisel verilerin korunması hakkında aydınlatma metni.",
};

export default function KVKKPage() {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        KVKK Aydınlatma Metni
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto text-center">
                        Kişisel Verilerin Korunması Hakkında Bilgilendirme
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none text-[#4B5563]">
                        <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">1. Veri Sorumlusu</h2>
                        <p>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verileriniz;
                            veri sorumlusu olarak <strong>Yerinde Analiz</strong> ("Şirket") tarafından aşağıda açıklanan
                            amaçlar doğrultusunda, hukuka ve dürüstlük kurallarına uygun şekilde işlenebilecek,
                            kaydedilebilecek, saklanabilecek, sınıflandırılabilecek ve mevzuatın öngördüğü hallerde
                            üçüncü kişilere aktarılabilecektir.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">2. İşlenen Kişisel Veriler</h2>
                        <p>Web sitemiz ve hizmetlerimiz kapsamında aşağıdaki kişisel veriler işlenmektedir:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                            <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi</li>
                            <li><strong>Talep Bilgileri:</strong> Seçilen paket, gayrimenkul türü, ada/parsel bilgileri, ilan linkleri</li>
                            <li><strong>Diğer Bilgiler:</strong> Form üzerinden iletilen notlar ve açıklamalar</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
                        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Danışmanlık hizmetlerinin sunulması ve yürütülmesi</li>
                            <li>Talebinizin değerlendirilmesi ve size uygun teklif hazırlanması</li>
                            <li>İletişim faaliyetlerinin yürütülmesi</li>
                            <li>Sözleşme süreçlerinin yürütülmesi</li>
                            <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
                            <li>İstatistiksel analizler yapılması</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">4. Kişisel Verilerin Aktarılması</h2>
                        <p>
                            Kişisel verileriniz; yasal yükümlülüklerimizi yerine getirmek, hizmetlerimizi sunmak ve
                            iş süreçlerimizi yürütmek amacıyla, gerekli güvenlik önlemleri alınarak, yetkili kamu
                            kurum ve kuruluşlarına ve iş ortaklarımıza aktarılabilecektir.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
                        <p>
                            Kişisel verileriniz; web sitemiz üzerindeki formlar, e-posta, telefon görüşmeleri ve
                            yüz yüze görüşmeler aracılığıyla toplanmaktadır. Bu veriler; sözleşmenin kurulması
                            veya ifası, açık rızanız, hukuki yükümlülük ve meşru menfaat kapsamında işlenmektedir.
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">6. Kişisel Veri Sahibinin Hakları</h2>
                        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                            <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">7. Başvuru</h2>
                        <p>
                            Yukarıda belirtilen haklarınızı kullanmak için <strong>info@yerindeanaliz.com</strong> adresine
                            e-posta göndererek veya aşağıdaki adrese yazılı başvuru yaparak bizimle iletişime geçebilirsiniz.
                        </p>
                        <p className="mt-4">
                            <strong>Adres:</strong> Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla
                        </p>

                        <h2 className="text-2xl font-bold text-[#2C3E50] mt-8 mb-4">8. Değişiklikler</h2>
                        <p>
                            Bu aydınlatma metni, mevzuattaki değişiklikler veya şirket politikalarımızdaki güncellemeler
                            doğrultusunda değiştirilebilir. Güncel metin her zaman web sitemizde yayınlanacaktır.
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

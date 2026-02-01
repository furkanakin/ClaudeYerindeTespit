import { Metadata } from "next";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | Yerinde Analiz",
};

export default function KVKKPage() {
    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-[#2C3E50] mb-8">KVKK Aydınlatma Metni</h1>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-justify">
                    <p>
                        Yerinde Analiz ("Şirket") olarak, kişisel verilerinizin güvenliği ve gizliliğine önem veriyoruz.
                        6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun") uyarınca, veri sorumlusu sıfatıyla
                        işlediğimiz kişisel verileriniz hakkında sizleri bilgilendirmek isteriz.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">1. Kişisel Verilerin Toplanma Amacı</h2>
                    <p>
                        Kişisel verileriniz, şirketimiz tarafından sunulan hizmetlerden faydalanmanız, taleplerinizin
                        değerlendirilmesi, hizmetlerin geliştirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi
                        amaçlarıyla işlenmektedir.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">2. İşlenen Kişisel Veriler</h2>
                    <p>
                        İletişim formları ve analiz talepleri aracılığıyla; ad-soyad, telefon numarası, e-posta adresi,
                        gayrimenkul bilgileri ve ilgili gayrimenkulün konum verileri işlenmektedir.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">3. Verilerin Paylaşımı</h2>
                    <p>
                        Kişisel verileriniz, talebiniz kapsamında hizmetin ifası için gerekli olan iş ortaklarımız
                        ve yasal bir zorunluluk olması durumunda yetkili kamu kurumlarıyla paylaşılabilir.
                        Verileriniz üçüncü taraflara pazarlama amacıyla ASLA satılmaz.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">4. Haklarınız</h2>
                    <p>
                        Kanun'un 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, yanlış işlenmişse
                        düzeltilmesini talep etme ve verilerinizin silinmesini isteme haklarına sahipsiniz.
                        Taleplerinizi info@yerindeanaliz.com adresine iletebilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
}

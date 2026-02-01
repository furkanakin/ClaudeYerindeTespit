import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | Yerinde Analiz",
};

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-[#2C3E50] mb-8">Gizlilik Politikası</h1>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-justify">
                    <p>
                        Yerinde Analiz ("biz", "şirket"), ziyaretçilerimizin gizliliğini en üst seviyede tutmayı taahhüt eder.
                        Bu politika, web sitemizi kullandığınızda toplanan bilgilerin nasıl kullanıldığını açıklar.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">Veri Toplama</h2>
                    <p>
                        Analiz talepleriniz için form doldurduğunuzda, sağladığınız bilgileri yalnızca size hizmet sunmak
                        ve iletişime geçmek için kullanırız. Web sitemizde ayrıca çerezler (cookies) aracılığıyla
                        anonim kullanım istatistikleri toplanabilir.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">Veri Güvenliği</h2>
                    <p>
                        Bilgileriniz güvenli sunucularda saklanır ve yetkisiz erişime karşı gerekli teknik önlemlerle
                        korunur. Hassas verileriniz endüstri standartlarına uygun şekilde şifrelenir.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">Üçüncü Taraf Bağlantıları</h2>
                    <p>
                        Web sitemizde yer alan dış bağlantıların (örneğin ilan sitesi linkleri) gizlilik politikalarından
                        sorumlu değiliz.
                    </p>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mt-10 mb-4">Güncellemeler</h2>
                    <p>
                        Gizlilik politikamızda zaman zaman değişiklikler yapabiliriz. Güncel sürüm her zaman
                        bu sayfada yer alacaktır.
                    </p>
                </div>
            </div>
        </div>
    );
}

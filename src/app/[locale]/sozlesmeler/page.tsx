import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sözleşmeler | Yerinde Analiz",
    description:
        "Yerinde Analiz hizmet sözleşmeleri ve kullanım koşulları hakkında bilgi edinin.",
};

export default function SozlesmelerPage() {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-r from-[#8CC63F] to-[#7ab233]">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sözleşmeler</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Hizmet sözleşmeleri ve kullanım koşulları
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 bg-[#F9FAFB]">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="text-center py-12">
                            <p className="text-[#6B7280] text-lg">
                                Bu sayfa yakında güncellenecektir.
                            </p>
                            <p className="text-[#9CA3AF] mt-2">
                                Sorularınız için{" "}
                                <a href="/iletisim" className="text-[#8CC63F] hover:underline">
                                    iletişim sayfamızı
                                </a>{" "}
                                ziyaret edebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

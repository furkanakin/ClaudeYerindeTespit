import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | Yerinde Analiz",
};

export default function KullanimKosullariPage() {
    return (
        <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Kullanım Koşulları</h1>
            <div className="prose prose-lg max-w-none text-gray-600">
                <p>Kullanım koşullarınız burada yer alacaktır.</p>
            </div>
        </div>
    );
}

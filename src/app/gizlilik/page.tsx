import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | Yerinde Analiz",
};

export default function GizlilikPage() {
    return (
        <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>
            <div className="prose prose-lg max-w-none text-gray-600">
                <p>Gizlilik politikanız burada yer alacaktır.</p>
            </div>
        </div>
    );
}

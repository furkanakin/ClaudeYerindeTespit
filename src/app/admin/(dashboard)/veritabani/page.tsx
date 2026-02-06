"use client";

import { useState, useRef } from "react";
import {
    Download,
    Upload,
    Loader2,
    Database,
    CheckCircle,
    AlertCircle,
    FileJson,
    Shield,
    HardDrive,
} from "lucide-react";

interface ImportResult {
    pageContents?: number;
    faqs?: number;
    legalPages?: number;
    contactSubmissions?: number;
}

export default function VeritabaniPage() {
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | "info";
        message: string;
        details?: ImportResult;
    } | null>(null);
    const [confirmImport, setConfirmImport] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<{
        version: string;
        exportedAt: string;
        counts: Record<string, number>;
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = async () => {
        setExporting(true);
        setStatus(null);
        try {
            const response = await fetch("/api/admin/database");
            if (!response.ok) throw new Error("Export failed");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `yerinde-analiz-backup-${new Date().toISOString().split("T")[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStatus({
                type: "success",
                message: "Veritabanı yedeği başarıyla indirildi.",
            });
        } catch {
            setStatus({
                type: "error",
                message: "Veritabanı yedeği indirilemedi.",
            });
        } finally {
            setExporting(false);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setStatus(null);
        setConfirmImport(false);

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            if (!data.data) {
                setStatus({
                    type: "error",
                    message: "Geçersiz yedek dosyası formatı.",
                });
                setSelectedFile(null);
                return;
            }

            const counts: Record<string, number> = {};
            if (data.data.pageContents)
                counts["Sayfa İçerikleri"] = data.data.pageContents.length;
            if (data.data.faqs) counts["SSS"] = data.data.faqs.length;
            if (data.data.legalPages)
                counts["Sözleşmeler"] = data.data.legalPages.length;
            if (data.data.contactSubmissions)
                counts["Başvurular"] = data.data.contactSubmissions.length;

            setFilePreview({
                version: data.version || "Bilinmiyor",
                exportedAt: data.exportedAt
                    ? new Date(data.exportedAt).toLocaleString("tr-TR")
                    : "Bilinmiyor",
                counts,
            });
            setConfirmImport(true);
        } catch {
            setStatus({
                type: "error",
                message: "Dosya okunamadı. Geçerli bir JSON dosyası seçiniz.",
            });
            setSelectedFile(null);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) return;

        setImporting(true);
        setStatus(null);
        setConfirmImport(false);

        try {
            const text = await selectedFile.text();
            const data = JSON.parse(text);

            const response = await fetch("/api/admin/database", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: "Veritabanı başarıyla geri yüklendi!",
                    details: result.imported,
                });
            } else {
                setStatus({
                    type: "error",
                    message: result.error || "İçe aktarma başarısız.",
                });
            }
        } catch {
            setStatus({
                type: "error",
                message: "Dosya yüklenirken hata oluştu.",
            });
        } finally {
            setImporting(false);
            setSelectedFile(null);
            setFilePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2C3E50] flex items-center gap-3">
                    <Database className="w-8 h-8 text-[#8CC63F]" />
                    Veritabanı Yönetimi
                </h1>
                <p className="text-[#6B7280] mt-2">
                    Veritabanınızı JSON olarak yedekleyin ve başka ortamlara
                    taşıyın.
                </p>
            </div>

            {/* Status Messages */}
            {status && (
                <div
                    className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${status.type === "success"
                            ? "bg-green-50 border border-green-200"
                            : status.type === "error"
                                ? "bg-red-50 border border-red-200"
                                : "bg-blue-50 border border-blue-200"
                        }`}
                >
                    {status.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : status.type === "error" ? (
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                        <p
                            className={`font-medium ${status.type === "success"
                                    ? "text-green-800"
                                    : status.type === "error"
                                        ? "text-red-800"
                                        : "text-blue-800"
                                }`}
                        >
                            {status.message}
                        </p>
                        {status.details && (
                            <div className="mt-2 text-sm text-green-700 space-y-1">
                                {Object.entries(status.details).map(
                                    ([key, count]) => (
                                        <p key={key}>
                                            • {key}: {count} kayıt
                                        </p>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-xl flex items-center justify-center">
                            <Download className="w-6 h-6 text-[#8CC63F]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#2C3E50]">
                                Yedeği İndir
                            </h2>
                            <p className="text-sm text-[#6B7280]">
                                Tüm verileri JSON olarak dışa aktar
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <HardDrive className="w-4 h-4 text-[#8CC63F]" />
                            Sayfa İçerikleri, SSS, Sözleşmeler
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <FileJson className="w-4 h-4 text-[#8CC63F]" />
                            Başvuru formları ve iletişim verileri
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <Shield className="w-4 h-4 text-[#8CC63F]" />
                            Kullanıcı şifreleri dahil değil
                        </div>
                    </div>

                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8CC63F] text-white rounded-xl hover:bg-[#7AB82F] transition-colors disabled:opacity-50 font-medium"
                    >
                        {exporting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                        {exporting ? "İndiriliyor..." : "Yedeği İndir"}
                    </button>
                </div>

                {/* Import Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Upload className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#2C3E50]">
                                Yedeği Yükle
                            </h2>
                            <p className="text-sm text-[#6B7280]">
                                JSON dosyasından verileri geri yükle
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                            <AlertCircle className="w-4 h-4" />
                            Mevcut veriler silinip yerine yenileri yazılır
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <FileJson className="w-4 h-4 text-orange-500" />
                            Sadece .json formatı desteklenir
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={importing}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#2C3E50] border-2 border-dashed border-gray-300 rounded-xl hover:border-[#8CC63F] hover:bg-[#8CC63F]/5 transition-colors disabled:opacity-50 font-medium"
                    >
                        {importing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Upload className="w-5 h-5" />
                        )}
                        {importing
                            ? "Yükleniyor..."
                            : "JSON Dosyası Seç"}
                    </button>
                </div>
            </div>

            {/* Import Preview & Confirm */}
            {confirmImport && filePreview && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-orange-200 p-6">
                    <h3 className="text-lg font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
                        <FileJson className="w-5 h-5 text-orange-500" />
                        Yüklenecek Veriler
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-[#6B7280]">Dosya</p>
                            <p className="font-medium text-[#2C3E50] text-sm truncate">
                                {selectedFile?.name}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-[#6B7280]">
                                Yedek Tarihi
                            </p>
                            <p className="font-medium text-[#2C3E50] text-sm">
                                {filePreview.exportedAt}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        {Object.entries(filePreview.counts).map(
                            ([name, count]) => (
                                <div
                                    key={name}
                                    className="flex items-center justify-between px-3 py-2 bg-orange-50 rounded-lg"
                                >
                                    <span className="text-sm text-[#2C3E50]">
                                        {name}
                                    </span>
                                    <span className="text-sm font-bold text-orange-600">
                                        {count} kayıt
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-700 font-medium">
                            ⚠️ Bu işlem mevcut tüm verilerin üzerine yazacaktır.
                            Bu işlem geri alınamaz!
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setConfirmImport(false);
                                setSelectedFile(null);
                                setFilePreview(null);
                                if (fileInputRef.current)
                                    fileInputRef.current.value = "";
                            }}
                            className="flex-1 px-4 py-3 bg-gray-100 text-[#6B7280] rounded-xl hover:bg-gray-200 transition-colors font-medium"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleImport}
                            disabled={importing}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 font-medium"
                        >
                            {importing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Upload className="w-5 h-5" />
                            )}
                            {importing
                                ? "Yükleniyor..."
                                : "Evet, Geri Yükle"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

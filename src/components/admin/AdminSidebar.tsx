"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Mail,
    Home,
    Info,
    Package,
    HelpCircle,
    Phone,
    LogOut,
    Globe,
    PanelBottom,
    FileSearch,
    MapPin,
    Crown,
    Scroll,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Başvurular",
        icon: Mail,
        children: [
            { title: "Tüm Başvurular", href: "/admin/basvurular", icon: Mail },
            { title: "Paket Talepleri", href: "/admin/basvurular/paketler", icon: Package },
            { title: "İletişim Formu", href: "/admin/basvurular/iletisim", icon: Phone },
        ],
    },
    {
        title: "Paketler",
        icon: Package,
        children: [
            { title: "Paketler Sayfası", href: "/admin/icerik/paketler", icon: FileText },
            { title: "Ön Analiz", href: "/admin/icerik/paketler/on-analiz", icon: FileSearch },
            { title: "Yerinde Analiz", href: "/admin/icerik/paketler/yerinde-analiz", icon: MapPin },
            { title: "Premium Danışmanlık", href: "/admin/icerik/paketler/premium", icon: Crown },
            { title: "Modal Metinleri", href: "/admin/icerik/paketler/modal", icon: FileText },
        ],
    },
    {
        title: "İçerik Yönetimi",
        icon: FileText,
        children: [
            { title: "Anasayfa", href: "/admin/icerik/anasayfa", icon: Home },
            { title: "Hakkımızda", href: "/admin/icerik/hakkimizda", icon: Info },
            {
                title: "SSS",
                href: "#",
                icon: HelpCircle,
                children: [
                    { title: "Sıkça Sorulan Sorular", href: "/admin/icerik/sss/sorular", icon: HelpCircle },
                    { title: "Sayfa Ayarları", href: "/admin/icerik/sss", icon: FileText },
                ]
            },
            { title: "İletişim", href: "/admin/icerik/iletisim", icon: Phone },
            { title: "Footer", href: "/admin/icerik/footer", icon: PanelBottom },
            { title: "Navbar", href: "/admin/icerik/navbar", icon: Globe },
            { title: "Sözleşmeler", href: "/admin/icerik/sozlesmeler", icon: Scroll },
        ],
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#2C3E50] text-white flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8CC63F] rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="font-bold">Yerinde Analiz</p>
                        <p className="text-xs text-white/60">Yönetim Paneli</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <div key={item.title}>
                        {item.children ? (
                            <div className="mb-2">
                                <div className="flex items-center gap-3 px-3 py-2 text-white/60 text-sm font-medium uppercase tracking-wider">
                                    <item.icon className="w-4 h-4" />
                                    {item.title}
                                </div>
                                <div className="ml-4 space-y-1">
                                    {item.children.map((child) => (
                                        <div key={child.href}>
                                            <Link
                                                href={child.href}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === child.href
                                                    ? "bg-[#8CC63F] text-white"
                                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <child.icon className="w-4 h-4" />
                                                {child.title}
                                            </Link>
                                            {/* Nested children for one more level if needed */}
                                            {child.children && (
                                                <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-2">
                                                    {child.children.map((subChild) => (
                                                        <Link
                                                            key={subChild.href}
                                                            href={subChild.href}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${pathname === subChild.href
                                                                ? "text-[#8CC63F] font-semibold"
                                                                : "text-white/50 hover:text-white hover:bg-white/5"
                                                                }`}
                                                        >
                                                            <subChild.icon className="w-3 h-3" />
                                                            {subChild.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${pathname === item.href
                                    ? "bg-[#8CC63F] text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.title}
                            </Link>
                        )}
                    </div>
                ))}

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}

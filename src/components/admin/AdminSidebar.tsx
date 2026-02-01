"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Globe,
    Home,
    Info,
    Package,
    HelpCircle,
    Phone,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Başvurular",
        href: "/admin/basvurular",
        icon: FileText,
    },
];

const contentPages = [
    { title: "Anasayfa", href: "/admin/icerik/anasayfa", icon: Home },
    { title: "Hakkımızda", href: "/admin/icerik/hakkimizda", icon: Info },
    { title: "Paketler", href: "/admin/icerik/paketler", icon: Package },
    { title: "SSS", href: "/admin/icerik/sss", icon: HelpCircle },
    { title: "İletişim", href: "/admin/icerik/iletisim", icon: Phone },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [contentOpen, setContentOpen] = useState(pathname.startsWith("/admin/icerik"));

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[#2C3E50] text-white z-40 hidden lg:block">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#8CC63F] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">YA</span>
                    </div>
                    <span className="font-bold text-lg">Admin Panel</span>
                </Link>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-[#8CC63F] text-white"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}

                {/* Content Management Dropdown */}
                <div className="pt-4">
                    <button
                        onClick={() => setContentOpen(!contentOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5" />
                            <span>İçerik Yönetimi</span>
                        </div>
                        {contentOpen ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>

                    {contentOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                            {contentPages.map((page) => {
                                const isActive = pathname === page.href;
                                return (
                                    <Link
                                        key={page.href}
                                        href={page.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                                            isActive
                                                ? "bg-[#8CC63F] text-white"
                                                : "text-white/60 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <page.icon className="w-4 h-4" />
                                        <span>{page.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                    <Home className="w-4 h-4" />
                    <span>Siteyi Görüntüle</span>
                </Link>
            </div>
        </aside>
    );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Layers,
    MessageSquare,
    LogOut,
    ChevronRight,
    Globe,
    Home,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Panel" },
    { href: "/admin/basvurular", icon: MessageSquare, label: "Başvurular" },
    {
        label: "İçerik Yönetimi",
        icon: Globe,
        isHeader: true
    },
    { href: "/admin/icerik/anasayfa", icon: Home, label: "Anasayfa" },
    { href: "/admin/icerik/hakkimizda", icon: FileText, label: "Hakkımızda" },
    { href: "/admin/icerik/paketler", icon: Layers, label: "Paketler" },
    { href: "/admin/icerik/sss", icon: FileText, label: "SSS" },
    { href: "/admin/icerik/iletisim", icon: FileText, label: "İletişim" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Don't show layout on login page
    if (pathname === "/admin/login") return <>{children}</>;

    const NavItem = ({ item }: { item: any }) => {
        if (item.isHeader) {
            return (
                <p className="px-4 mt-8 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {item.label}
                </p>
            );
        }

        const isActive = pathname === item.href;

        return (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                        ? "bg-[#8CC63F] text-white shadow-lg shadow-[#8CC63F]/20"
                        : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-[#8CC63F]")} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex">
            {/* Sidebar Desktop */}
            <aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-bottom border-gray-100">
                    <Link href="/admin" className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#8CC63F] rounded-lg"></div>
                        Management
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item, idx) => (
                        <NavItem key={idx} item={item} />
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
                    <Link href="/admin" className="font-bold text-[#2C3E50]">Management</Link>
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                <main className="p-4 lg:p-8 flex-grow">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute inset-y-0 left-0 w-72 bg-white flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <span className="font-bold text-[#2C3E50]">Management</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                            {menuItems.map((item, idx) => (
                                <NavItem key={idx} item={item} />
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </div>
    );
}

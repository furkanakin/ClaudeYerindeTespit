"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Menu, X } from "lucide-react";

interface AdminHeaderProps {
    username: string;
}

export default function AdminHeader({ username }: AdminHeaderProps) {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await fetch("/api/admin/auth", { method: "DELETE" });
            router.push("/admin/login");
            router.refresh();
        } catch {
            console.error("Logout failed");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Mobile menu button */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-[#2C3E50]" />
            </button>

            <div className="flex-1" />

            {/* User menu */}
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <div className="w-8 h-8 bg-[#8CC63F] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#2C3E50] hidden sm:block">
                        {username}
                    </span>
                </button>

                {showMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>{loggingOut ? "Çıkılıyor..." : "Çıkış Yap"}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}

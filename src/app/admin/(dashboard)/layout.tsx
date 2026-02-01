import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { valid } = await validateSession();

    if (!valid) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex">
            <AdminSidebar />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    );
}

import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getSessionFromCookies();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6]">
            <AdminSidebar />
            <div className="lg:pl-64">
                <AdminHeader username={user.username} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}

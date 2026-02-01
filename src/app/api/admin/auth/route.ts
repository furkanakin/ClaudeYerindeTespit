import { NextRequest, NextResponse } from "next/server";
import { login, ensureAdminUser, deleteSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Ensure admin user exists
        await ensureAdminUser();

        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Kullanıcı adı ve şifre gereklidir" },
                { status: 400 }
            );
        }

        const token = await login(username, password);

        if (!token) {
            return NextResponse.json(
                { error: "Kullanıcı adı veya şifre hatalı" },
                { status: 401 }
            );
        }

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_session")?.value;

        if (token) {
            await deleteSession(token);
        }

        cookieStore.delete("admin_session");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
}

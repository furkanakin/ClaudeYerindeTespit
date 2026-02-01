import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const sessionToken = request.cookies.get("admin_session")?.value;

        if (!sessionToken) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Handle locale prefix for public pages (optional if handled by [locale] folder)
    // But let's keep it simple for now as we have [locale] folder.

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

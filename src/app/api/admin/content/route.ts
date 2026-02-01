import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("page");

    if (!pageSlug) return NextResponse.json({ error: "Page slug is required" }, { status: 400 });

    try {
        const content = await prisma.pageContent.findMany({
            where: { pageSlug },
        });
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { pageSlug, updates } = await request.json(); // updates: { id?, key, tr, en }[]

        for (const item of updates) {
            await prisma.pageContent.upsert({
                where: { pageSlug_key: { pageSlug, key: item.key } },
                update: { tr: item.tr, en: item.en },
                create: { pageSlug, key: item.key, tr: item.tr, en: item.en },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const user = await getSessionFromCookies();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { pageSlug, content } = await request.json();

        // Upsert each content item
        for (const item of content) {
            await prisma.pageContent.upsert({
                where: {
                    pageSlug_key: {
                        pageSlug,
                        key: item.key,
                    },
                },
                update: {
                    tr: item.tr,
                    en: item.en,
                },
                create: {
                    pageSlug,
                    key: item.key,
                    tr: item.tr,
                    en: item.en,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Content save error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageSlug = searchParams.get("pageSlug");

        if (!pageSlug) {
            return NextResponse.json(
                { error: "pageSlug required" },
                { status: 400 }
            );
        }

        const content = await prisma.pageContent.findMany({
            where: { pageSlug },
        });

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Content fetch error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
}

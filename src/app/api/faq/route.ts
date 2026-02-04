import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Failed to fetch public FAQs:", error);
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

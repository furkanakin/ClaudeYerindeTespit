import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all FAQs for admin
export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

// POST new FAQ
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { questionTr, answerTr, questionEn, answerEn, order } = body;

        const faq = await prisma.faq.create({
            data: {
                questionTr,
                answerTr,
                questionEn,
                answerEn,
                order: order || 0,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        console.error("Failed to create FAQ:", error);
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all FAQs for admin
export async function GET() {
    try {
        const faqs = await (prisma as any).faq.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs || []);
    } catch (error: any) {
        console.error("Admin FAQ GET Error:", error);
        return NextResponse.json({ error: "Veriler alınamadı", details: error.message }, { status: 500 });
    }
}

// POST new FAQ
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { questionTr, answerTr, questionEn, answerEn, order } = body;

        const faq = await (prisma as any).faq.create({
            data: {
                questionTr,
                answerTr,
                questionEn,
                answerEn,
                order: order || 0,
            },
        });

        return NextResponse.json(faq);
    } catch (error: any) {
        console.error("Admin FAQ POST Error:", error);
        return NextResponse.json({ error: "Kayıt oluşturulamadı", details: error.message }, { status: 500 });
    }
}

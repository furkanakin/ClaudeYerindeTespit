import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { faqs as staticFaqs } from "@/lib/data/faq";

export async function POST() {
    try {
        // Clear existing FAQs if any (optional, but good for a fresh start)
        // await prisma.faq.deleteMany({});

        // Count existing FAQs to avoid duplicate seeding if already seeded
        const count = await prisma.faq.count();
        if (count > 0) {
            return NextResponse.json({ message: "FAQs already exist in database. Skipping seed." });
        }

        // Prepare and create FAQs from static file
        const createdFaqs = await Promise.all(
            staticFaqs.map((faq, index) =>
                prisma.faq.create({
                    data: {
                        questionTr: faq.question,
                        answerTr: faq.answer,
                        questionEn: faq.questionEn || faq.question,
                        answerEn: faq.answerEn || faq.answer,
                        order: index,
                    }
                })
            )
        );

        return NextResponse.json({
            success: true,
            count: createdFaqs.length,
            message: "Static FAQs successfully migrated to database."
        });
    } catch (error: any) {
        console.error("FAQ Seeding Error:", error);
        return NextResponse.json({
            error: "Failed to seed FAQs",
            details: error.message
        }, { status: 500 });
    }
}

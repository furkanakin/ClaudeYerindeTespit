import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { faqs as staticFaqs } from "@/lib/data/faq";

export async function POST() {
    try {
        console.log("Starting FAQ migration...");

        // Clear existing FAQs to ensure a clean migration
        const deleted = await (prisma as any).faq.deleteMany({});
        console.log(`Deleted ${deleted.count} existing FAQs`);

        // Prepare and create FAQs from static file
        let createdCount = 0;

        // Using for...of loop for more reliable sequential creation
        for (let i = 0; i < staticFaqs.length; i++) {
            const faq = staticFaqs[i];
            await (prisma as any).faq.create({
                data: {
                    questionTr: faq.question || "",
                    answerTr: faq.answer || "",
                    questionEn: faq.questionEn || faq.question || "",
                    answerEn: faq.answerEn || faq.answer || "",
                    order: i,
                }
            });
            createdCount++;
        }

        console.log(`Successfully migrated ${createdCount} FAQs`);

        return NextResponse.json({
            success: true,
            count: createdCount,
            message: `${createdCount} adet soru başarıyla veritabanına aktarıldı.`
        });
    } catch (error: any) {
        console.error("FAQ Migration Error:", error);
        return NextResponse.json({
            error: "Aktarım başarısız oldu",
            details: error.message
        }, { status: 500 });
    }
}

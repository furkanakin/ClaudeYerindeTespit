import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { faqs as staticFaqs } from "@/lib/data/faq";

export async function POST() {
    try {
        console.log("Starting DB Initialization & FAQ Migration...");

        // 1. Create Table manually since 'prisma db push' is not available
        try {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "Faq" (
                    "id" TEXT NOT NULL,
                    "questionTr" TEXT NOT NULL,
                    "answerTr" TEXT NOT NULL,
                    "questionEn" TEXT NOT NULL,
                    "answerEn" TEXT NOT NULL,
                    "order" INTEGER NOT NULL DEFAULT 0,
                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "updatedAt" TIMESTAMP(3) NOT NULL,
                    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
                );
            `);
            console.log("Faq table verified/created.");
        } catch (e) {
            console.error("Table creation failed (might already exist or permission error):", e);
        }

        // 2. Clear existing FAQs to ensure a clean migration
        try {
            const deleted = await (prisma as any).faq.deleteMany({});
            console.log(`Deleted ${deleted.count} existing FAQs`);
        } catch (e) {
            console.warn("Could not delete existing records (table might be empty or missing):", e);
        }

        // 3. Prepare and create FAQs from static file
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
            message: `Veritabanı tablosu oluşturuldu ve ${createdCount} adet soru yüklendi.`
        });
    } catch (error: any) {
        console.error("Critical Migration Error:", error);
        return NextResponse.json({
            error: "Kritik Kurulum Hatası",
            details: error.message
        }, { status: 500 });
    }
}

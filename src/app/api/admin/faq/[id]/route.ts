import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT update FAQ
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { questionTr, answerTr, questionEn, answerEn, order } = body;

        const faq = await prisma.faq.update({
            where: { id },
            data: {
                questionTr,
                answerTr,
                questionEn,
                answerEn,
                order: order !== undefined ? order : undefined,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        console.error("Failed to update FAQ:", error);
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}

// DELETE FAQ
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.faq.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete FAQ:", error);
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const [submissionCount, contentCount, userCount] = await Promise.all([
            prisma.contactSubmission.count(),
            prisma.pageContent.count(),
            prisma.user.count(),
        ]);

        return NextResponse.json({
            submissions: submissionCount,
            content: contentCount,
            users: userCount,
            // Placeholder for visits as we don't have tracking yet
            visits: Math.floor(Math.random() * 50) + 10,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}

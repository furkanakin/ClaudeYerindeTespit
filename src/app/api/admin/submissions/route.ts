import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
    }
}

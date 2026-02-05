import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
    try {
        // Run prisma db push from the server environment
        const { stdout, stderr } = await execPromise("npx prisma db push --accept-data-loss");

        return NextResponse.json({
            success: true,
            stdout,
            stderr,
            message: "Database schema sync attempted."
        });
    } catch (error: any) {
        console.error("DB Sync Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stderr: error.stderr,
            stdout: error.stdout
        }, { status: 500 });
    }
}

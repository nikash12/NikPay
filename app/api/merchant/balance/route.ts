import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function GET(request: NextRequest) {
    // In a real application, you would fetch this data from your database
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const merchantId = session.user.id;
        const balance = await prisma.merchantBalance.findUnique({
            where: { merchantId },
        });

        if (!balance) {
            return NextResponse.json({ error: "Balance not found" }, { status: 404 });
        }

        return NextResponse.json({ balance }, { status: 200 });

    } catch (error) {
        console.error("Error fetching merchant balance:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
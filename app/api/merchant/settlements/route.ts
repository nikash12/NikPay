import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function GET(request: NextRequest) {

    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const merchantId = session.user.id;
        const settlements = await prisma.settlement

    } catch (error) {
        console.error("Error fetching merchant balance:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
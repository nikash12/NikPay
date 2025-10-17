import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email || "" },
            select: { id: true, balance: true },
        });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        return NextResponse.json({ balance: user.balance });
    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
// this is mock bank provider
import { NextRequest,NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function POST(req :NextRequest) {
    try{
        const body = await req.json();
        const { event, orderId, token } = body;
        const mock_token = await prisma.onRampTransaction.findFirst({
            where: {
                id: orderId,
                token: token
            }
        })
        if( !mock_token ) {
            return new NextResponse(JSON.stringify({ error: "Invalid token" }), { status: 400 });
        }
        
        if( event === "onramp_completed" ) {
            // adding amount to user balance
            await prisma.balance.upsert({
                where: { userId: mock_token.userId },
                update: { amount: { increment: mock_token.amount } },
                create: { userId: mock_token.userId, amount: mock_token.amount }
            });
            // updating transaction status
            await prisma.onRampTransaction.update({
                where: { id: mock_token.id },
                data: { status: "COMPLETED" }
            })
            
            return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
        }else{
            // updating transaction status to canceled
            await prisma.onRampTransaction.update({
                where: { id: mock_token.id },
                data: { status: "FAILED" }
            })
            return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
        }
    }catch(err: unknown) {
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
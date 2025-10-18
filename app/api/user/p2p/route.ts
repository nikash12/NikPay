import { NextRequest } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();
        const schema = z.object({
            to : z.string().length(13),
            amount : z.string().regex(/^\d+(\.\d+)?$/)
        })
        const res = schema.safeParse(body)
        if(!res.success) {
            return new Response("Invalid data", { status: 400 });
        }
        const { to, amount } = res.data;
        const amt = Math.floor(parseFloat(amount) * 100);

        // checking if receiver exists
        const receiver  = await prisma.user.findUnique({
            where: {
                number: to
            }
        })

        if(!receiver){
            return new Response("Receiver not found", { status: 404 });
        }
        
        // checking balance
        const senderBalance = await prisma.balance.findUnique({
            where: {
                userId: session.user.id
            }
        })
        if(!senderBalance || senderBalance.amount < amt){
            return new Response("Insufficient balance", { status: 400 });
        }

        await prisma.$transaction(async (tx)=> {
            // Deducting amount from sender
            await tx.balance.upsert({
                where: { userId: session.user.id },
                update: { amount: { decrement: amt } },
                create: { userId: session.user.id, amount: -amt }
            });
            // Adding amount to receiver
            await tx.balance.upsert({
                where: { userId: receiver.id },
                update: { amount: { increment: amt } },
                create: { userId: receiver.id, amount: amt }
            });
            await tx.p2PTransaction.create({
                data: {
                    senderId: session.user.id,
                    receiverId: receiver.id,
                    status: "COMPLETED",
                    amount: amt
                }
            });
        });


        return new Response("Transaction successful", { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response("Invalid request", { status: 400 });    
    }
}
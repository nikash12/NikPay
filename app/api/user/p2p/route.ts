import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();

        const schema = z.object({
            to: z.string(),
            amount: z.string().regex(/^\d+(\.\d+)?$/)
        });

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return new Response("Invalid data", { status: 400 });
        }

        const { to, amount } = parsed.data;
        const amt = Math.floor(parseFloat(amount) * 100);

        const senderBalance = await prisma.balance.findUnique({
            where: { userId: session.user.id }
        });
        if (!senderBalance || senderBalance.amount < amt) {
            return new Response("Insufficient balance", { status: 400 });
        }

        const receiver = await prisma.user.findUnique({
            where: { number: to }
        });

        if (receiver) {
            await prisma.$transaction(async (tx) => {
                await tx.balance.upsert({
                    where: { userId: session.user.id },
                    update: { amount: { decrement: amt } },
                    create: { userId: session.user.id, amount: -amt }
                });
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

            return new Response(JSON.stringify({ message: "Transaction successful" }), { status: 200 });
        }

        const merchant = await prisma.merchant.findFirst({
            where: {
                OR: [
                    { id: to },
                    { number: to }
                ]
            }
        });

        if (merchant) {
            const fees = Math.floor(amt * 0.03); // 3% fee
            const net_amount = amt - fees;

            const merchantPayment = await prisma.$transaction(async (tx) => {
                const deduct = await tx.balance.update({
                    where: { userId: session.user.id },
                    data: { amount: { decrement: amt } }
                });

                const payment = await tx.merchantPayment.create({
                    data: {
                        merchantId: merchant.id,
                        customerId: session.user.id,
                        amount: amt,
                        fees,
                        net_amount,
                        status: "PENDING"
                    }
                });

                return payment;
            });

            return new Response(JSON.stringify({
                message: "Merchant payment initiated",
                paymentId: merchantPayment.id
            }), { status: 200 });
        }

        return new Response("Receiver not found", { status: 404 });

    } catch (error) {
        console.error("Error processing transaction:", error);
        return new Response("Something went wrong", { status: 500 });
    }
}

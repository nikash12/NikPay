import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const { paymentId, status } = await req.json();

        if (!paymentId || !status) {
            return NextResponse.json({ error: "Missing paymentId or status" }, { status: 400 });
        }

        const payment = await prisma.merchantPayment.findUnique({ where: { id: paymentId } });
        if (!payment) {
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        if (payment.status === "COMPLETED") {
            return NextResponse.json({
                success: true,
                message: "Payment already verified",
                paymentId,
                status: "COMPLETED",
            });
        }

        // Transactional update
        await prisma.$transaction(async (tx) => {
            if (status === "COMPLETED") {
                await tx.merchantBalance.upsert({
                    where: { merchantId: payment.merchantId },
                    update: { amount: { increment: payment.net_amount } },
                    create: {
                        merchantId: payment.merchantId,
                        amount: payment.net_amount,
                    },
                });
            }

            await tx.merchantPayment.update({
                where: { id: paymentId },
                data: { status },
            });
        });

        return NextResponse.json({
            success: true,
            message: `Payment ${status.toLowerCase()} successfully`,
            paymentId,
        });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { success: false, message: "Payment verification failed" },
            { status: 500 }
        );
    }
}

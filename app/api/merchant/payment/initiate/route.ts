import { prisma } from "@/lib/prisma";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { amount, customerId, merchantId } = await req.json();
        if (!amount || !merchantId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const fees = amount * 3; // stored in cents, 3% fees
        const paymentInitiation = await prisma.merchantPayment.create({
            data: {
                merchantId,
                customerId,
                amount: amount * 100, // stored in cents
                status: "PENDING",
                fees,
                net_amount: amount * 100 - fees,
            },
        });
        const response = {
            paymentId: paymentInitiation.id,
            amount: paymentInitiation.amount,
            status: paymentInitiation.status
        }

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response("Invalid request", { status: 400 });
    }
}
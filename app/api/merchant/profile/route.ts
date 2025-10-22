import { NextRequest } from "next/server";
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {

    try {
        const session = await auth()
        if (!session || !session.user || session.user.role !== "merchant") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const merchantId = session.user.id;

        const merchantProfile = await prisma.merchant.findUnique({
            where: { id: merchantId },
        });
        if (!merchantProfile) {
            return new Response(JSON.stringify({ error: "Merchant profile not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(merchantProfile), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth()
        if (!session || !session.user || session.user.role !== "merchant") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const merchantId = session.user.id;
        const data = await req.json();
        const updatedMerchant = await prisma.merchant.update({
            where: { id: merchantId },
            data: {
                business_name: data.business_name,
                category: data.category,
                gst_number: data.gst_number,
                pan_number: data.pan_number,
                business_address: data.business_address,
            },
        });
        if (!updatedMerchant) {
            return new Response(JSON.stringify({ error: "Failed to update merchant profile" }), { status: 400 });
        }
        return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
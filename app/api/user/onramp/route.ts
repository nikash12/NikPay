import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/auth";
import axios from "axios";
import { prisma } from '@/lib/prisma'
export async function POST(request: NextRequest) {

    try{
        const session = await auth();
        if(!session || !session.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        console.log("User Session:", session.user);
        const body = await request.json();
        const { amount,provider } = await body;
        // Here you would integrate with a payment gateway or service to handle the onramp process.
        // For demonstration, we'll just return a success message.
        const newOnRamp = await prisma.onRampTransaction.create({
            data: {
                userId: session.user.id,
                status: "PENDING",
                token: "",
                provider: provider,
                amount
            }
        })
        console.log("New OnRamp Transaction:", newOnRamp);
        const providerResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mock/provider/create-order`, {
            userId: session.user.id,
            orderId: newOnRamp.id,
            amount: amount,
            provider: provider
        })
        if(providerResponse.status !== 200){
            await prisma.onRampTransaction.update({
                where: { id: newOnRamp.id },
                data: { status: "FAILED" }
            })
            return NextResponse.json({error: "Failed to initiate onramp process"}, {status: 500});
        }
        await prisma.onRampTransaction.update({
            where: { id: newOnRamp.id },
            data: { token: providerResponse.data.token }
        })
        return NextResponse.json({message: "Onramp process initiated successfully", orderId: newOnRamp.id, token: providerResponse.data.token}, {status: 200});
    }
    catch(error: unknown){
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
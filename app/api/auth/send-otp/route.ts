"use server"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        console.log("Request body:", body);
        const { number } = body;
        const code = Math.floor(Math.random()*10000).toString().padStart(4, '0');
        //we clear old OTPs

        await prisma.otp.deleteMany({
            where: {
                OR: [
                    { number: number },
                    { expiresAt: { lt: new Date() } }
                ]
            }
        })
        await prisma.otp.create({
            data: {
                number: number,
                code: code,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            }
        })
        // Here, you would typically send the OTP via SMS using a service like Twilio
        // but we just return it in the response
        return NextResponse.json({ message: "OTP sent successfully", otp: code }, { status: 200 });

    }catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}
"use server";
import { NextRequest, NextResponse } from "next/server";
import { MerchantSignUpSchema } from "@/types/merchant/merchantSignUp";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
    
        const { email, number, business_name } = body;

        const parsedData = MerchantSignUpSchema.safeParse({
            email,
            number,
            business_name
        });

        if( !parsedData.success ) {
            return NextResponse.json({ error: parsedData.error }, { status: 400 });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: parsedData.data.email },
                    { number: parsedData.data.number }
                ]
            }
        });
        if( existingUser ) {
            return NextResponse.json({ error: "User and Merchant should have unique email and phone number" }, { status: 400 });
        }   

        const existingMerchant = await prisma.merchant.findFirst({
            where: {
                OR: [
                    { email: parsedData.data.email },
                    { number: parsedData.data.number }
                ]
            }
        })

        if( existingMerchant ) {
            return NextResponse.json({ error: "Merchant with this email or phone number already exists" }, { status: 400 });
        }

        const newMerchant = await prisma.merchant.create({
            data: {
                email: parsedData.data.email,
                number: parsedData.data.number,
                business_name: parsedData.data.business_name
            }
        })

        return NextResponse.json({ message: "Merchant created successfully", user: newMerchant }, { status: 201 });
        
    }
    catch (error: unknown) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
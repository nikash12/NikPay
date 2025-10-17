"use server";
import { NextRequest, NextResponse } from "next/server";
import { UserSignUpSchema } from "@/types/user/userSignUp";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
    
        const { email, number, name} = body;

        const parsedData = UserSignUpSchema.safeParse({
            email,
            number,
            name
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
        })

        if( existingUser ) {
            return NextResponse.json({ error: "User with this email or phone number already exists" }, { status: 400 });
        }
        
        const newUser = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                number: parsedData.data.number,
                name: parsedData.data.name
            }
        })

        await prisma.balance.create({
            data: {
                userId: newUser.id,
                amount: 0
            }
        })

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
        
    }
    catch (error: unknown) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
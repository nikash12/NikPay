import axios from "axios";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId,token } = body;

        // Here you would integrate with a payment gateway or service to handle the completion process.
        // For demonstration, we'll just return a success message.
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/webhook/provider`, {
            event: "ORDER_CANCELED",
            orderId: orderId,
            token: token
        });
        return NextResponse.json({ message: "Onramp process canceled successfully", orderId }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
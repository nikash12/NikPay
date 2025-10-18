import axios from "axios";

// this is a mock endpoint for creating an order
export async function POST(request: Request) {
    const body = await request.json();
    const { userId, orderId, amount, provider } = body;
    if (!userId || !orderId || !amount || !provider) {
        return new Response(JSON.stringify({ error: "Missing userId, orderId, amount or provider" }), { status: 400 });
    }

    // Simulate order creation
    const mock_token = Math.random().toString(36).substring(6);

    return new Response(JSON.stringify({ orderId: orderId, token: mock_token }), { status: 200 });
}
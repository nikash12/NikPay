// /app/api/merchant/payments/route.ts or similar Express/Trpc handler

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // Use your unified auth

export async function GET(req: Request) {
  const session = await auth();

  // 1. Authorization Check
  if (!session || session.user.role !== "merchant") {
    return new Response("Unauthorized", { status: 403 });
  }

  const merchantId = session.user.id;

  try {
    // 2. Fetch Received P2P Transactions (The primary 'payment' flow)
    const merchantPayments = await prisma.merchantPayment.findMany({
      where: { merchantId },
      select: {
        id: true,
        amount: true,
        status: true,
        initiated_at: true,
        customerId: true,
      },
      orderBy: { initiated_at: "desc" },
    });

    // 3. Fetch OnRamp Transactions (Merchant's own deposits/onboarding)
    const onRampTransactions = await prisma.onRampTransaction.findMany({
      where: { userId: merchantId },
      select: {
        id: true,
        amount: true,
        status: true,
        initiated_at: true,
        provider: true,
      },
      orderBy: { initiated_at: "desc" },
    });

    // 4. Combine and Format for Frontend
    const allPayments = [
      ...merchantPayments.map((t) => ({
        id: t.id,
        type: "P2P",
        status: t.status,
        amount: t.amount,
        date: t.initiated_at.toISOString(),
        senderId: t.customerId
      })),
      ...onRampTransactions.map((t) => ({
        id: t.id,
        type: "OnRamp",
        status: t.status,
        amount: t.amount,
        date: t.initiated_at.toISOString(),
        provider: t.provider, // for counterparty display
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return Response.json(allPayments);

  } catch (e) {
    console.error("Payment fetch error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const filter = new URL(request.url).searchParams.get("filter") || "all";
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user.id;

    let whereClause: any;
    if (filter === "sent") {
      whereClause = { senderId: userId };
    } else if (filter === "received") {
      whereClause = { receiverId: userId };
    } else if (filter === "all") {
      whereClause = { OR: [{ senderId: userId }, { receiverId: userId }] };
    } else {
      return new Response(JSON.stringify({ error: "Invalid transaction type" }), { status: 400 });
    }

    const transactions = await prisma.p2PTransaction.findMany({
      where: whereClause,
      select: {
        id: true,
        status: true,
        amount: true,
        initiated_at: true,
        senderId: true,
        receiverId: true,
      },
      orderBy: { initiated_at: "desc" }, 
    });

    return new Response(JSON.stringify({ transactions }), { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), { status: 500 });
  }
}

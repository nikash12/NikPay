"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  status: "pending" | "completed" | "failed"; 
  amount: number;
  initiated_at: string; // or Date
  senderId: string;
  receiverId: string;
}


export default function UserTransactions() {
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/transactions", { params: { filter } });
        const data: Transaction[] = response.data.transactions;
        console.log("Fetched transactions:", data);
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [filter, status]);

  if (status !== "authenticated") {
    return <div className="text-center mt-10 text-gray-600">Please sign in to view your transactions.</div>;
  }

  const userId = session.user?.id;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Transactions for {session.user?.name}</h1>

      {/* Filter dropdown */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="p-2 bg-base-300 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Transactions</option>
          <option value="sent">Sent Transactions</option>
          <option value="received">Received Transactions</option>
        </select>
      </div>

      {/* Transactions list */}
      {loading ? (
        <span className="loading loading-ball loading-xl"></span>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <ul className="space-y-4">
          {transactions
            .filter(tx => 
              filter === "all" || 
              (filter === "sent" && tx.senderId === userId) || 
              (filter === "received" && tx.receiverId === userId)
            )
            .map(tx => {
              const isSent = tx.senderId === userId;
              return (
                <li
                  key={tx.id}
                  className="bg-base-100 flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium">
                      {isSent ? `Sent to ${tx.receiverId}` : `Received from ${tx.senderId}`}
                    </p>
                    <p className="text-gray-500 text-sm">{new Date(tx.initiated_at).toLocaleString()}</p>
                    <p className={`text-sm font-medium ${tx.status === "completed" ? "text-red-600" : tx.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>
                      {tx.status.toUpperCase()}
                    </p>
                  </div>
                  <div className={`font-semibold ${isSent ? "text-red-500" : "text-green-500"}`}>
                    {isSent ? "-" : "+"}₹{(tx.amount / 100).toFixed(2)}
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

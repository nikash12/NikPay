"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Payment {
  id: string;
  type: "OnRamp" | "P2P";
  status: "PENDING" | "COMPLETED" | "FAILED";
  amount: number;
  date: string;
  sender?: string; // for P2P
  receiver?: string; // for P2P
}

export default function MerchantPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETED" | "FAILED">("ALL");

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await axios.get("/api/merchant/payments");
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  const filteredPayments =
    filter === "ALL" ? payments : payments.filter((p) => p.status === filter);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin text-primary w-6 h-6" />
      </div>
    );

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold text-primary">Payments / Transactions</h2>
          <p className="text-sm text-gray-500 mb-4">
            Review your incoming and outgoing transactions. Filter by status to quickly find what you need.
          </p>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["ALL", "PENDING", "COMPLETED", "FAILED"].map((status) => (
              <button
                key={status}
                className={`btn btn-sm ${
                  filter === status ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setFilter(status as any)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Counterparty</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td className="text-sm">{p.id.slice(0, 8)}...</td>
                    <td>{p.type}</td>
                    <td>₹{p.amount.toFixed(2)}</td>
                    <td>
                      {p.status === "COMPLETED" && (
                        <span className="badge badge-success">{p.status}</span>
                      )}
                      {p.status === "PENDING" && (
                        <span className="badge badge-warning">{p.status}</span>
                      )}
                      {p.status === "FAILED" && (
                        <span className="badge badge-error">{p.status}</span>
                      )}
                    </td>
                    <td>{new Date(p.date).toLocaleString()}</td>
                    <td>
                      {p.type === "P2P"
                        ? `From: ${p.sender || "-"} → To: ${p.receiver || "-"}`
                        : "-"}
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

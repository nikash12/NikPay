// /app/merchant/dashboard/MerchantSettlements.tsx

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, DollarSign, Wallet, Lock, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/toast/ToastProvider";

// Define the shape of a payout/settlement record
interface Settlement {
  id: string;
  amount: number;
  fees: number;
  status: "PENDING" | "PROCESSED" | "FAILED";
  initiatedDate: string;
  completedDate: string;
  bankRefId: string;
}

// Define the shape of the balance data (fetched from /api/merchant/balance)
interface BalanceData {
  amount: number;
  locked: number;
}

export default function MerchantSettlements() {
  const { data: session } = useSession();
  const { showToast } = useToast();
  
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState<number | ''>('');

  const availableAmount = balance ? balance.amount - balance.locked : 0;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Balance Data
        const balanceRes = await axios.get("/api/merchant/balance");
        setBalance(balanceRes.data);

        // Fetch Settlement History
        const settlementRes = await axios.get("/api/merchant/settlements");
        setSettlements(settlementRes.data);
      } catch (err) {
        showToast("Failed to load settlements data", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleManualPayout = async () => {
    if (!payoutAmount || payoutAmount <= 0) {
      showToast("Please enter a valid amount.", "error");
      return;
    }
    if (payoutAmount > availableAmount) {
      showToast("Insufficient available balance.", "error");
      return;
    }

    try {
      // API call to trigger a manual settlement
      await axios.post("/api/merchant/payout", { amount: payoutAmount });
      
      showToast("Payout requested successfully!", "success");
      setPayoutAmount('');
      // Optionally re-fetch data or update local state
    } catch (err) {
      showToast("Payout request failed.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin text-primary w-6 h-6" />
      </div>
    );

  return (
    <div className="bg-base-100 shadow-xl p-6 rounded-box">
      <h2 className="card-title text-2xl font-semibold text-primary mb-6">Settlements Overview</h2>
      
      {/* 1. Settlement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Current Balance Card */}
        <div className="stat bg-neutral text-neutral-content rounded-lg p-4 shadow-md">
          <div className="stat-figure text-primary">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="stat-title text-white opacity-80">Current Balance</div>
          <div className="stat-value">₹{(balance?.amount || 0).toFixed(2)}</div>
        </div>
        
        {/* Locked Funds Card */}
        <div className="stat bg-base-300 text-gray-700 rounded-lg p-4 shadow-md">
          <div className="stat-figure text-warning">
            <Lock className="w-8 h-8" />
          </div>
          <div className="stat-title">Locked Funds</div>
          <div className="stat-value text-xl">₹{(balance?.locked || 0).toFixed(2)}</div>
        </div>

        {/* Available for Payout Card */}
        <div className="stat bg-primary text-primary-content rounded-lg p-4 shadow-md">
          <div className="stat-figure text-white">
            <DollarSign className="w-8 h-8" />
          </div>
          <div className="stat-title text-white opacity-80">Available for Payout</div>
          <div className="stat-value">₹{availableAmount.toFixed(2)}</div>
        </div>
      </div>

      {/* 2. Manual Payout Request */}
      <div className="card bg-base-200 shadow-md mb-8">
        <div className="card-body p-5">
          <h3 className="text-lg font-bold mb-3">Request Manual Payout</h3>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="form-control flex-grow w-full">
              <label className="label">Amount (Max: ₹{availableAmount.toFixed(2)})</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="input input-bordered w-full"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(parseFloat(e.target.value))}
                min="1"
                max={availableAmount}
              />
            </div>
            <button 
              onClick={handleManualPayout} 
              className="btn btn-success gap-2 w-full sm:w-auto"
              disabled={payoutAmount === '' || payoutAmount <= 0 || payoutAmount > availableAmount}
            >
              <Send className="w-4 h-4" /> Withdraw Now
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Payouts are typically processed within 1-2 business days.</p>
        </div>
      </div>

      {/* 3. Settlement History */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Settlement History</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Settlement ID</th>
              <th>Amount</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Initiated Date</th>
              <th>Bank Reference</th>
            </tr>
          </thead>
          <tbody>
            {settlements.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No settlement history found.
                </td>
              </tr>
            ) : (
              settlements.map((s) => (
                <tr key={s.id}>
                  <td className="text-sm">{s.id.slice(0, 8)}...</td>
                  <td>**₹{s.amount.toFixed(2)}**</td>
                  <td>₹{s.fees.toFixed(2)}</td>
                  <td>
                    {s.status === "PROCESSED" && (
                      <span className="badge badge-success">{s.status}</span>
                    )}
                    {s.status === "PENDING" && (
                      <span className="badge badge-warning">{s.status}</span>
                    )}
                    {s.status === "FAILED" && (
                      <span className="badge badge-error">{s.status}</span>
                    )}
                  </td>
                  <td>{new Date(s.initiatedDate).toLocaleDateString()}</td>
                  <td>{s.bankRefId || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
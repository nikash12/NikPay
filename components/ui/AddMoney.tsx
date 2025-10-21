'use client'

import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useToast } from "./toast/ToastProvider";

const schema = z.object({
    amount: z.number().min(1, "Amount must be at least 1").max(100000, "Amount must be less than or equal to 100000"),
});

export default function AddMoney() {
    const [popUpOpen, setPopupOpen] = useState(false);
    const [provider, setProvider] = useState("MockBank");
    const [amount, setAmount] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const { showToast } = useToast();
    async function handleAddMoney() {
        //we initiate the onramp process
        try {
            const response = await axios.post('/api/user/onramp', {
                amount: Number(amount)*100,
                provider: provider
            });
            setOrderId(response.data.orderId);
            setToken(response.data.token);
            setPopupOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleConfirm(event: React.FormEvent) {
        event.preventDefault();
        const parsedAmount = Number(amount);
        const validation = schema.safeParse({ amount: parsedAmount });
        if (!validation.success) {
            showToast(validation.error.issues.map(issue => issue.message).join(", "), "error");
            return;
        }
        try {
            await axios.post('/api/mock/provider/complete', {
                orderId: orderId,
                token: token
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(true);
            setPopupOpen(false);
        }
    }

    async function handleCancel(event: React.FormEvent) {
        event.preventDefault();
        try {
            await axios.post('/api/mock/provider/cancel', {
                orderId: orderId,
                token: token
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(true);
            setPopupOpen(false);    
        }
    }

    return (
        <form
            className="flex flex-col justify-center items-center  bg-base-200 p-4 rounded-lg"
            onSubmit={handleConfirm}
        >
            <input
                type="text"
                placeholder="Amount to add"
                className="input input-bordered w-full max-w-xs mb-4"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select className="select select-bordered w-full max-w-xs mb-4" value={provider} onChange={(e) => setProvider(e.target.value)}>
                <option disabled>Select Payment Method</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
            </select>
            <button
                type="button"
                onClick={handleAddMoney}
                className="btn btn-primary "
            >
                Add Money
            </button>

            {popUpOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 rounded-lg w-96 text-center">
                        <h1 className="text-lg font-bold mb-4">Mock Bank Provider</h1>
                        <p>Confirm adding ₹{amount} to your balance</p>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-secondary mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}

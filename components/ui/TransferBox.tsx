import axios from "axios"
import { useState } from "react"
import { z } from "zod"
import { PhoneNumberInput } from "../utils/PhoneNumberInput"
import { useToast } from "./toast/ToastProvider"

export default function TransferBox() {
    const [number, setNumber] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const { showToast } = useToast();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("") // Reset error
        console.log("Input lengths:", { number: number.length, amount: amount.length })

        if (!number || !amount) {
            setError("Both fields are required")
            return
        }

        const schema = z.object({
            number: z.string().min(10, "Enter a valid phone number").max(13),
            amount: z.string().min(1, "Enter an amount").max(6)
        })

        const res = schema.safeParse({ number, amount })

        if (!res.success) {
            setError(res.error.issues.map(e => e.message).join(", "))
            return
        }

        const { data } = res
        setLoading(true)
        try {
            const response = await axios.post(`/api/user/p2p`, {
                to: data.number,
                amount: data.amount
            })
            console.log(response.data);
            if (response.data?.paymentId) {
                await axios.patch(`/api/merchant/payment/verify`, {
                    paymentId: response.data.paymentId,
                    status: "COMPLETED"
                });
            }
            console.log("Transfer successful:", { number, amount })
            setNumber("")
            setAmount("")
            showToast("Money sent successfully!", "success");
        } catch (err: unknown) {
            showToast("Failed to send money. Try again.", "error");
            setError("Failed to send money. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="shadow-md rounded-xl p-6 grid gap-5 w-full max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-white text-center">
                Send Money
            </h2>

            <label className="text-sm font-medium text-white">Phone Number</label>
            <PhoneNumberInput value={number} onChange={setNumber} />

            <label className="text-sm font-medium text-white">Amount (INR)</label>
            <input
                type="number"
                placeholder="Enter amount"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                className={`btn btn-primary btn-lg w-full ${loading ? "loading" : ""
                    }`}
                disabled={loading}
            >
                {loading ? "Processing..." : "Send Money"}
            </button>
        </form>
    )
}
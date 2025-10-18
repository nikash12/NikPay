import axios from "axios";
import { useEffect, useState } from "react";

export default function BalanceCard() {
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchBalance() {
        const response = await axios.get("/api/user/balance");
        console.log(response.data.balance);
        setBalance(response.data.balance?.amount || 0);
        setLoading(false);
    }
    useEffect(() => {
        fetchBalance();
    }, []);
    return (
        <div className="border-1 border-black rounded-2xl shadow-xl m-auto w-full h-[20vh] p-4 flex flex-col justify-center items-center bg-base-100 ">
            <h2 className="text-sm sm:text-lg md:text-lg font-light ">Your Balance</h2>
            {loading ? (
                <div className="text-gray-500">Loading...</div>
            ) : (
                <p className="text-3xl sm:text-4xl md:text-4xl font-bold text-white">
                    {balance > 9999
                        ? `₹ ${(balance / 100000).toFixed(1)}K`
                        : `₹ ${balance}`}
                        
                </p>
            )}
        </div>
    )
}

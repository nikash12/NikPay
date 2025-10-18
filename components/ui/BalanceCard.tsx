import axios from "axios";
import { useEffect, useState } from "react";

export default function BalanceCard() {
    const [balance, setBalance] = useState<number>(0);
    async function fetchBalance() {
        const response = await axios.get("/api/user/balance");
        console.log(response.data.balance);
        setBalance(response.data.balance.amount);
    }
    useEffect(() => {
        fetchBalance();
    }, []);
    return (
        <div className="border-1 border-black rounded-2xl shadow-xl m-auto w-full h-[20vh] p-4 flex flex-col justify-center items-center bg-base-100 ">
            <h2 className="text-sm sm:text-lg md:text-lg font-light ">Your Balance</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                ₹{(balance / 100).toFixed(2)}
            </p>
        </div>
    );
}

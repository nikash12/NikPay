"use client"
import AddMoney from "@/components/ui/AddMoney";
import BalanceCard from "@/components/ui/BalanceCard";




export default function WalletPage() {
    return(
        <div className="h-full">
            <div className="h-[20%]">
                <BalanceCard />
            </div>
            <div className="grid grid-cols-1 gap-2 h-[80%] ">
                <AddMoney />
            </div>
        </div>
    )
}
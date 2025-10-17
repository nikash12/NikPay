"use client"
import AddMoney from "@/components/ui/AddMoney";
import BalanceCard from "@/components/ui/BalanceCard";




export default function WalletPage() {
    return(
        <div>
            <BalanceCard />
            <div>
                {/* Adding Money to wallet here */}
                <div className="grid grid-cols-1 gap-2 ">
                    <AddMoney />
                </div>
            </div>
        </div>
    )
}
"use client"

import BalanceCard from "@/components/ui/BalanceCard";
import TransferBox from "@/components/ui/TransferBox";
import UserTransactions from "@/components/ui/UserTransactions";
import { useSession } from "next-auth/react"
import Link from "next/link";

export default function TransferPage() {
    const session = useSession();
    if (session.status !== "authenticated") {
        return <div>Please sign in to access this page.</div>;
    }
    const user = session.data.user;
    return (
        <div className="mx-[10%]">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-lg grid h-[50vh] grow place-items-center">
                    <div className="m-1 flex flex-col items-center gap-4">
                        <p className="font-bold text-2xl">{user?.name}</p>
                        <BalanceCard />
                        <p> <Link className="underline hover:text-blue-600" href="/user/dashboard/wallet">Add money</Link> to your wallet</p>
                    </div>
                    
                </div>
                <div className="divider lg:divider-horizontal">TO</div>
                <div className="card bg-base-300 rounded-box grid h-[50vh] grow place-items-center">
                    <TransferBox />
                </div>
            </div>
            <div className="overflow-x-auto mt-10 bg-base-300 text-white h-[40vh] rounded-lg p-4">
                <UserTransactions />
            </div>
        </div>
    )
}
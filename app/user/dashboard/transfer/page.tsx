"use client"

import TransferBox from "@/components/ui/TransferBox";
import { useSession } from "next-auth/react"

export default function TransferPage() {
    const session = useSession();
    if (session.status !== "authenticated") {
        return <div>Please sign in to access this page.</div>;
    }
    const user = session.data.user;
    return (
        <div>
            <h1>Transfer Money Here</h1>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grid h-[50vh] grow place-items-center">
                    <h1>FROM</h1>
                    <p>{user?.name}</p>
                    
                </div>
                <div className="divider lg:divider-horizontal">TO</div>
                <div className="card bg-base-300 rounded-box grid h-[50vh] grow place-items-center">
                    <TransferBox />
                </div>
            </div>
        </div>
    )
}
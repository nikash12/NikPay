"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session, status } = useSession();

    if (status === "loading") return null;

    return (
        <div className="w-full navbar bg-base-300 px-4">
            <div className="flex justify-between items-center w-full">
                <Link href={`/${session?.user?.role || "user"}/dashboard`} className="btn btn-ghost normal-case text-xl flex items-center">
                    <img src="/logo.png" alt="NikPay Logo" className="h-8 w-auto mr-2" />
                </Link>

                {session?.user?.email ? (
                    <Link href={`/${session.user.role}/dashboard`} className="btn btn-outline">
                        {session.user.email}
                    </Link>
                ) : (
                    <Link href="/signin" className="btn btn-primary">
                        Log In
                    </Link>
                )}
            </div>
        </div>
    );
}

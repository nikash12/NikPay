import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full navbar bg-base-300 px-4">
            <div className="">
                <Link href="/user/dashboard" className="btn btn-ghost normal-case text-xl">
                    <img src="/logo.png" alt="NikPay Logo" className="h-8 w-auto mr-2"/>
                </Link>
            </div>
        </div>
    )
}
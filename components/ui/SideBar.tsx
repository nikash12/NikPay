import Link from "next/link";

export default function SideBar({children}: {children?: React.ReactNode}) {
    return (
        <div className="drawer drawer-open bg-green-900">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
                {/* Sidebar content here */}
                <ul className="menu w-full grow">

                    <li>
                        <Link href="/user/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            <span className="is-drawer-close:hidden">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="inline-block w-5 h-5 my-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 0 1 12 15a9 9 0 0 1 6.879 2.804M15 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/></svg>
                            <span className="is-drawer-close:hidden">Profile</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/transfer" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transfer">
                            <svg    xmlns="http://www.w3.org/2000/svg"    viewBox="0 0 24 24"    strokeLinejoin="round"    strokeLinecap="round"    strokeWidth="2"    fill="none"    stroke="currentColor"    className="inline-block size-4 my-1.5"  >    <path d="M4 7h16M4 17h16M16 4l4 4-4 4M8 20l-4-4 4-4" />  </svg>
                            <span className="is-drawer-close:hidden">Transfer</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/wallet" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Wallet">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="inline-block w-5 h-5 my-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></svg>
                            <span className="is-drawer-close:hidden">Wallet</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link href="/user/dashboard/transactions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transactions">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="inline-block w-5 h-5 my-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/></svg>
                            <span className="is-drawer-close:hidden">Transactions</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/settings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            <span className="is-drawer-close:hidden">Settings</span>
                        </Link>
                    </li>

                </ul>

                {/* button to open/close drawer */}
                <div className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open">
                    <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                </div>

                </div>
            </div>
            </div>
    )
}
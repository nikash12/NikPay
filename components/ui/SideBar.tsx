import Link from "next/link";

export default function SideBar({children}: {children?: React.ReactNode}) {
    return (
        <div className="drawer drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
                {/* Sidebar content here */}
                <ul className="menu w-full grow space-y-2 p-2 bg-base-300 text-base-content">

                    <li>
                        <Link href="/user/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                            </svg>
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
                        <Link href="/user/dashboard/transfer" className="text-gray-800 dark:text-white font-bold is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transfer">
                            <svg    xmlns="http://www.w3.org/2000/svg"    viewBox="0 0 24 24"    strokeLinejoin="round"    strokeLinecap="round"    strokeWidth="2"    fill="none"    stroke="currentColor"    className="inline-block size-4 my-1.5"  >    <path d="M4 7h16M4 17h16M16 4l4 4-4 4M8 20l-4-4 4-4" />  </svg>
                            <span className="is-drawer-close:hidden">Transfer</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/wallet" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Wallet">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"/>
                            </svg>

                            <span className="is-drawer-close:hidden">Wallet</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link href="/user/dashboard/transactions" className="text-gray-800 dark:text-white font-bold is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transactions">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="inline-block w-5 h-5 my-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/></svg>
                            <span className="is-drawer-close:hidden">Transactions</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/dashboard/settings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>

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
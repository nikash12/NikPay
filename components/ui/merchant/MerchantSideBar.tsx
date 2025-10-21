import Link from "next/link";

export default function MerchantSidebar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="drawer drawer-open">
      <input id="merchant-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content">{children}</div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="merchant-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
          {/* Sidebar menu */}
          <ul className="menu w-full grow space-y-2 p-2 bg-base-300 text-base-content">
            
            <li>
              <Link
                href="/merchant/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/merchant/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Business Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 my-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A9 9 0 0 1 12 15a9 9 0 0 1 6.879 2.804M15 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Business Profile</span>
              </Link>
            </li>

            <li>
              <Link
                href="/merchant/dashboard/payments"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payments"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 my-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Payments</span>
              </Link>
            </li>

            <li>
              <Link
                href="/merchant/dashboard/settlements"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settlements"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3 .843 3 1.882V19.12C15 20.157 13.657 21 12 21s-3-.843-3-1.88V9.882C9 8.843 10.343 8 12 8zm0 0V4m0 4H9m3 0h3"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Settlements</span>
              </Link>
            </li>

            <li>
              <Link
                href="/merchant/dashboard/transactions"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Transactions"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 my-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Transactions</span>
              </Link>
            </li>

            <li>
              <Link
                href="/merchant/dashboard/settings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1"
                  />
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>

          {/* Drawer toggle button */}
          <div
            className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Open"
          >
            <label
              htmlFor="merchant-drawer"
              className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="inline-block size-4 my-1.5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

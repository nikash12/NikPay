import MerchantSideBar from "@/components/ui/merchant/MerchantSideBar";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        <MerchantSideBar>
          {children}
        </MerchantSideBar>
    </div>
  );
}

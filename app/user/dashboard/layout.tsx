import SideBar from "@/components/ui/SideBar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <SideBar>
            {children}
        </SideBar>
    </div>
  );
}

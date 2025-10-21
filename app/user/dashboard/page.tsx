"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session check
    if (!session) {
      router.push("/signin");
      return;
    }

    if (session.user.role === "merchant") {
      router.push("/merchant/dashboard/profile");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Sign in first to access the dashboard.</div>;
  }

  if (session.user.role === "merchant") {
    // Return null because we're redirecting
    return null;
  }

  return (
    <div>
      <h1>Welcome To Dashboard</h1>
    </div>
  );
}

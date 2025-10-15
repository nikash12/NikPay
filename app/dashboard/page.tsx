"use client"
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  console.log("Current session:", session);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

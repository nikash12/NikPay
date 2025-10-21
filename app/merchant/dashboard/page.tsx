"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please sign in to view this page.</div>;

  const user = session.user;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Welcome {user.role === "merchant" ? user.business_name : user.name}
      </h1>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      {user.role === "merchant" && (
        <>
          <p>Category: {user.category}</p>
          <p>GST Number: {user.gst_number}</p>
        </>
      )}
    </div>
  );
}

"use client";

import { signOut } from "next-auth/react";
import ProfileIcon from "@/components/ui/ProfileIcon";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function ProfilePage() {
  const session = useSession();
  const user = session?.data?.user;
  const handleSignOut = async () => {
    await signOut();
    Router.push("/signin");
  };

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Complete the signIn.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <ProfileIcon name={user.name || "U"} />
        <h2 className="mt-4 text-2xl font-semibold ">{user.name}</h2>
        <p className="text-blue-500 text-sm">{user.email}</p>
      </div>

      <div className=" shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          <p className="p-4 font-medium ">
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <p className="p-4 font-medium ">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p className="p-4 font-medium ">
            <span className="font-semibold">KYC Status:</span> {user.kyc_status}
          </p>
        </div>
      </div>

      <button
        onClick={handleSignOut}

        className="btn mt-6 bg-red-500 text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}

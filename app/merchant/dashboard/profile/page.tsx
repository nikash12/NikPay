"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { Loader2, Upload, Save, LogOut } from "lucide-react";

interface Merchant {
  business_name: string;
  category: string;
  gst_number: string;
  pan_number: string;
  business_address: string;
  kyc_status: "PENDING" | "VERIFIED" | "REJECTED";
  gstDoc?: string;
  panDoc?: string;
  bankProof?: string;
}

export default function MerchantProfile() {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState({
    gstDoc: null as File | null,
    panDoc: null as File | null,
    bankProof: null as File | null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/merchant/profile");
        setMerchant(res.data);
      } catch (err) {
        showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!merchant) return;
    setMerchant({ ...merchant, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploaded } = e.target;
    if (uploaded && uploaded[0]) {
      setFiles((prev) => ({ ...prev, [name]: uploaded[0] }));
    }
  };

  const handleSave = async () => {
    try {
      console.log(merchant);
      await axios.patch("/api/merchant/profile", merchant);
      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast("Failed to update profile", "error");
    }
  };

  const handleSubmitKYC = async () => {
    const formData = new FormData();
    if (files.gstDoc) formData.append("gstDoc", files.gstDoc);
    if (files.panDoc) formData.append("panDoc", files.panDoc);
    if (files.bankProof) formData.append("bankProof", files.bankProof);

    try {
      await axios.post("/api/merchant/kyc-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("KYC documents submitted successfully", "success");
    } catch (err) {
      showToast("KYC upload failed", "error");
    }
  };

  if (!session) {
    return <div className="text-center mt-10 text-lg font-medium">Please sign in to view your profile.</div>;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin text-primary w-6 h-6" />
      </div>
    );

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT PANEL */}
        <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold text-primary">Business Information</h2>
            <p className="text-sm text-gray-500 mb-4">
              Manage your merchant details. Make sure everything is accurate before submitting KYC.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Business Name</label>
                <input
                  type="text"
                  name="business_name"
                  className="input input-bordered w-full"
                  value={merchant?.business_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered w-full"
                  value={merchant?.category || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label font-medium">GST Number</label>
                <input
                  type="text"
                  name="gst_number"
                  className="input input-bordered w-full"
                  value={merchant?.gst_number || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label font-medium">PAN Number</label>
                <input
                  type="text"
                  name="pan_number"
                  className="input input-bordered w-full"
                  value={merchant?.pan_number || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label className="label font-medium">Address</label>
                <textarea
                  name="business_address"
                  className="textarea textarea-bordered w-full"
                  value={merchant?.business_address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button onClick={handleSave} className="btn btn-primary gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold text-primary">KYC Verification</h2>
            <p className="text-sm text-gray-500 mb-4">
              Upload your documents for KYC verification. Our team will review and update your status.
            </p>

            <div className="mb-4">
              {merchant?.kyc_status === "VERIFIED" && (
                <span className="badge badge-success badge-lg">✅ VERIFIED</span>
              )}
              {merchant?.kyc_status === "PENDING" && (
                <span className="badge badge-warning badge-lg">🕒 PENDING</span>
              )}
              {merchant?.kyc_status === "REJECTED" && (
                <span className="badge badge-error badge-lg">❌ REJECTED</span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="label font-medium">GST Document</label>
                <input type="file" name="gstDoc" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
              </div>
              <div>
                <label className="label font-medium">PAN Document</label>
                <input type="file" name="panDoc" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
              </div>
              <div>
                <label className="label font-medium">Bank Proof</label>
                <input type="file" name="bankProof" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button onClick={handleSubmitKYC} className="btn btn-success gap-2">
                <Upload className="w-4 h-4" /> Submit for Verification
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end mt-8">
        <button onClick={() => signOut()} className="btn btn-outline gap-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

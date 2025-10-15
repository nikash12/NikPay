"use client";
import OtpForm from "@/components/utils/OtpForm";
import { PhoneNumberInput } from "@/components/utils/PhoneNumberInput";
import axios from "axios";
import { useState } from "react";
import { set } from "zod";

export default function SignInPage() {
  const [number, setNumber] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [mockedOtp, setMockedOtp] = useState<string>("");

  const handleSendOtp = async () => {
    if (!number) {
      alert("Please enter a valid phone number");
      return;
    }

    axios.post("/api/auth/send-otp",{ number })
    .then((res) => {
        alert("OTP sent successfully");
        setMockedOtp(res.data.otp);
        setOtpSent(true);
    })
    .catch((err) => {
        console.error(err);
        alert("Error sending OTP");
    });
  };
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        <div className="w-full flex flex-col gap-4">
          {!otpSent ? (
            <>
              <PhoneNumberInput
                value={number}
                onChange={setNumber}
                
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
              >
                Send OTP
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center">
              <h2 className="text-xl font-semibold">Enter OTP</h2>
              <OtpForm role="user" number={number} />
              {mockedOtp!="" && (
                <p className="text-sm text-gray-400">
                  (Mocked OTP: <span className="font-mono">{mockedOtp}</span>)
                </p>
              )}
              <button
                onClick={() => setOtpSent(false)}
                className="mt-2 text-sm text-gray-400 hover:underline"
              >
                Change number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

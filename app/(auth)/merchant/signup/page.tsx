"use client"

import { PhoneNumberInput } from "@/components/utils/PhoneNumberInput";
import { useState } from "react";
import { MerchantSignUpType,MerchantSignUpSchema } from "@/types/merchant/merchantSignUp";
import axios from "axios"
import { useRouter } from "next/navigation";
import { error } from "console";

export default function SignUpPage() {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if( !verified ) {
            alert("Please verify your phone number");   
            return;
        }
        
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const business_name = formData.get("business_name");

        if( !email || !phone || !business_name ) {
            alert("Please fill all required fields");
            return;
        }
        const merchantData: MerchantSignUpType = {
            email: email as string,
            number: phone as string,
            business_name: business_name as string
        };

        const res = MerchantSignUpSchema.safeParse(merchantData)
        if(!res.success) {
            alert("Enter details correctly")
            console.log(res.error);
            return
        }

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/merchant/signup`, merchantData)
        .then((data) => {
            console.log(data.data);
            router.push("/merchant/dashboard")
        })
        .catch((error)=>{
            alert(error)
        })
        console.log(merchantData);
    };
    const handleSendOtp = () => {
        // Logic to send OTP to the phone number
        setOtpSend(true);
    }
    const [phone, setPhone] = useState<string>("");
    const [otpsend, setOtpSend] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    return(
        <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">
            <form className="border-[0.1px] h-[70vh] w-[70vw] md:w-[40vw] border-white flex flex-col justify-center gap-4 p-8 rounded-lg bg-gray-800" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4 text-center">User Sign Up</h1>
                <input type="email" placeholder="Email" className="input-lg border-b-1 p-1" name="email" required/>
                <PhoneNumberInput value={phone} onChange={setPhone} />
                {
                    !otpsend ? <button type="button" className="btn mt-1" onClick={() => handleSendOtp()}>Send OTP</button> :
                    !verified ? <div className="flex gap-2">
                        <input type="text" placeholder="Enter OTP" className="input-lg border-b-1 p-1" />
                        <button type="button" className="btn mt-1" onClick={() => setVerified(true)}>Verify OTP</button>
                        <button type="button" className="btn mt-1" onClick={() => setOtpSend(false)}>Resend OTP</button>
                    </div> : <span className="text-green-500 font-semibold">Phone number verified</span>
                }
                <input type="text" placeholder="Business Name" className="input-lg border-b-1 p-1" name="business_name" required/>
                <button type="submit" className="btn mt-1">Sign Up</button>
            </form>
        </div>
    )
}
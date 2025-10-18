"use client"

import { PhoneNumberInput } from "@/components/utils/PhoneNumberInput";
import { useState } from "react";
import { UserSignUpType,UserSignUpSchema } from "@/types/user/userSignUp";
import axios from "axios"
import { useRouter } from "next/navigation";
import { error } from "console";
import { useToast } from "@/components/ui/toast/ToastProvider";

export default function SignUpPage() {
    const router = useRouter()
    const { showToast } = useToast();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if( !verified ) {
            showToast("Please verify your phone number", "error");
            return;
        }
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const name = formData.get("name");
        
        const userData: UserSignUpType = {
            email: email as string,
            number: phone as string,
            name: name as string,
        };

        const res = UserSignUpSchema.safeParse(userData)
        if(!res.success) {
            showToast("Enter details correctly", "error");
            return
        }

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/signup`, userData)
        .then((data) => {
            console.log(data.data);
            router.push("/user/signin");
        })
        .catch((error)=>{
            showToast("Failed to create account", "error");
        })
        console.log(userData);
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
                <input type="text" placeholder="Name" className="input-lg border-b-1 p-1" name="name" required/>
                <button type="submit" className="btn mt-1">Sign Up</button>
            </form>
        </div>
    )
}
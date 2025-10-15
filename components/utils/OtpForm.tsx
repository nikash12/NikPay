"use client"
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

export default function OtpForm({role, number}:{role:"user" | "merchant", number:string}) {
    const [otp, setOtp] = useState<(string | number)[]>(["", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    
    const handleChange = (index: number, value: string) => {
        if(!/^\d*$/.test(value)) return; 
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
    }
    }   

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index]) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(otp.some(digit => digit === "")) {
            alert("Please enter all OTP digits");
            return;
        }
        const enteredOtp = otp.join("");
        console.log("Entered  OTP:", enteredOtp);
        
        const result = await signIn("credentials",{
            number: number,
            otp: enteredOtp,
            redirect: false
        })
        console.log(result);
        if (result?.error) {
            alert("OTP invalid or expired");
        } else {
            // success, manually redirect
            window.location.href = `/dashboard`;
        }
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="tel"
                    value={digit}
                    className="border-1"
                    maxLength={1}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    style={{ width: '2rem', textAlign: 'center', marginRight: '0.5rem' }}
                    ref={el => {inputsRef.current[index] = el}}
                    onChange={(e) => {
                        handleChange(index, e.target.value);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
            <button type="submit">Submit</button>
        </form>
    )
}
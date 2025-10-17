import axios from "axios"
import { useState } from "react"
import { z } from "zod"
import { PhoneNumberInput } from "../utils/PhoneNumberInput"
export default function TransferBox() {
    const [number, setNumber] = useState<string>("")
    const [amount, setAmount] = useState<string>("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();        
        if(!number || !amount) return
        const schema = z.object({
            number : z.string().min(10).max(10),
            amount : z.string().min(1).max(6)
        })
        const res = schema.safeParse({number, amount})
        if(!res.success) return
        const { data } = res
        try{
            await axios.post(`/api/user/p2p`, {
                number: data.number,
                amount: data.amount
            })
        }catch(err: unknown){
            throw err
        }
    }

    return(
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <PhoneNumberInput value={number} onChange={setNumber} />            
            <input type="text" placeholder="Amount(INR)" className="border-b-1 input-lg p-1" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button type="submit" className="btn ">Send Money</button>
        </form>
    )
}
import axios from "axios";


export default function AddMoney() {
    async function handleAddMoney(event: React.FormEvent) {
        event.preventDefault();
        // Handle adding money logic here
        axios.post('/api/wallet/onramp')
    }
    return(
        <form className="flex flex-col justify-center items-center w-[30%] bg-gray-800 p-4 rounded-lg" onSubmit={handleAddMoney}>
            <input type="number" placeholder="Amount to add" className="input input-bordered w-full max-w-xs mb-4" />
            {/* Razorpay Payment Gateway will handle the payment processing */}
            <select className="select select-bordered w-full max-w-xs mb-4">
                <option disabled >Select Payment Method</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
            </select>
            <button type="submit" className="btn btn-primary w-[80%]">Add Money</button>
        </form>
    )
}
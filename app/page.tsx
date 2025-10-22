import Navbar from "@/components/ui/Navbar";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
export default function Home() {
  return (
    <div className={"min-h-screen bg-base-200 " + poppins.className}>
      <Navbar />

      <main className="flex justify-center items-center py-16 md:py-24 px-4">

        <div className="bg-purple-400 rounded-3xl shadow-xl mr-[20%] ml-[5%] h-[800px]">

          <div className="flex flex-col lg:flex-row p-6 md:p-12">

            <div className="lg:w-3/5 pt-8 pr-4 pb-10 lg:pr-12">
              <div className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900">
                <h1>Fast, safe</h1>
                <h1>social</h1>
                <h1>payments.</h1>
              </div>

              <h2 className="mt-8 text-lg md:text-xl text-gray-700 max-w-lg">
                Pay, get paid, grow a business, and more. Join the tens of millions of people on NikPay.
              </h2>
              <Link href="/user/signup">
                <button className="bg-purple-800 text-white rounded-full py-3 px-6 mt-8 font-medium hover:bg-purple-900 transition-colors">
                  Start as User
                </button>
              </Link>
              <Link href="/merchant/signup">
                <button className="bg-white text-purple-800 rounded-full py-3 px-6 mt-4 font-medium hover:bg-gray-100 transition-colors">
                  Start as Merchant
                </button>
              </Link>
            </div>

            <div className="relative left-[15%] top-[100px]  lg:w-4/5 mt-8 ">
              <img
                src="home-img.jpg"
                alt="Description of a happy family"
                className="object-cover rounded-2xl h-full"
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
import type { Metadata } from "next"
import OptimismPriceChart from "../components/OptimismPriceChart";

// Custom Metadata
export const metadata: Metadata = {
  title: "Optimism Price",
  description: "Lookup price metrics related to the Optimism blockchain"
}

// Optimism Price Page Wrapper Custom Component
export default function OptimismPricePage() {
    return (
        <div className="bg-gray-800 text-gray-300 py-5 px-4 sm:px-6 lg:px-8 shadow-lg">
            <OptimismPriceChart />
        </div>
    )
}
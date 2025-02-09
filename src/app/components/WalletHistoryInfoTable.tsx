'use client';

import useSWR from "swr";
import PostFetcher from "../utils/functions/PostFetcher";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import PostFetcherArgs from "../utils/types/PostFetcherArgs";
import WalletHistoryInfoType from "../utils/types/WalletHistoryInfoType";

// Custom Wallet History Info Table Component
export default function WalletHistoryInfoTable(props: { address: string }) {
    const { address } = props;

    // Make API call upon loading the custom component
    const { data: historicalData, error: walletHistoryError, isLoading: loadingWalletHistory } = 
    useSWR(['/api/wallet-history-data', { walletAddress: address }], ([url, body]: [string, PostFetcherArgs]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });
    
    // Conditionally render the info table 
    if (loadingWalletHistory) {
        return <div>Loading Wallet Chain History Table</div>
    }
    else if (walletHistoryError) {
        throw new Error();
    }
    else {
        const walletHistoryData: WalletHistoryInfoType = historicalData;

        // Render Transaction Balance Info Table Component
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Chain History</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">Transaction Number</TableHead>
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Transaction Hash</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-b border-gray-800">
                            <TableCell className="text-gray-300">First Transaction</TableCell>
                            <TableCell className="text-gray-300">{walletHistoryData?.active_chains[0]?.first_transaction?.block_timestamp.split("T")[0] + ' - ' + walletHistoryData?.active_chains[0]?.last_transaction?.block_timestamp.split("T")[1] }</TableCell>
                            <TableCell className="text-gray-300">{walletHistoryData?.active_chains[0]?.first_transaction?.transaction_hash}</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-800">
                            <TableCell className="text-gray-300">Last Transaction</TableCell>
                            <TableCell className="text-gray-300">{walletHistoryData?.active_chains[0]?.last_transaction?.block_timestamp.split("T")[0] + ' - ' + walletHistoryData?.active_chains[0]?.last_transaction?.block_timestamp.split("T")[1] }</TableCell>
                            <TableCell className="text-gray-300">{walletHistoryData?.active_chains[0]?.last_transaction?.transaction_hash}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}
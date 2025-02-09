'use client';

import useSWR from "swr";
import PostFetcher from "../utils/functions/PostFetcher";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import WalletBalanceType from "../utils/types/WalletBalanceType";
import PostFetcherArgs from "../utils/types/PostFetcherArgs";

// Custom Wallet Balance Info Table Component
export default function WalletBalanceInfoTable(props: { address: string }) {
    const { address } = props;

    // Make API call upon loading the custom component
    const { data, error: walletBalanceError, isLoading: loadingWalletBalance } = 
    useSWR(['/api/wallet-balance-data', { walletAddress: address }], ([url, body]: [string, PostFetcherArgs]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });
    
    // Conditionally render the info table 
    if (loadingWalletBalance) {
        return <div>Loading Wallet Balance Info Table Component</div>
    }
    else if (walletBalanceError) {
        throw new Error();
    }
    else {
        const walletBalanceData: WalletBalanceType = data;

        // Render Transaction Balance Info Table Component
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Wallet Balance</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">ETH Price</TableHead>
                            <TableHead className="text-gray-300">Token ETH Value</TableHead>
                            <TableHead className="text-gray-300">Wallet Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-b border-gray-800">
                            <TableCell className="text-gray-300">{"$" + Number(walletBalanceData?.ethPrice)}</TableCell>
                            <TableCell className="text-gray-300">{Number(walletBalanceData?.balanceInformation.result)/1000000000000000000 + ' ETH'}</TableCell>
                            <TableCell className="text-gray-300">{"$" + Number(walletBalanceData?.balanceInformation.result)/1000000000000000000 * Number(walletBalanceData?.ethPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import useSWR from "swr";
import PostFetcher from "../utils/functions/PostFetcher";
import PostFetcherArgs from "../utils/types/PostFetcherArgs";
import WalletTransactionType from "../utils/types/WalletTransactionType";

// Transaction Activity Table Custom Component
export default function WalletTransactionsInfoTable( props : { address: string }) {
    const { address } = props;

    // useSWR hook for enabling API request call
    const { data: transactionActivityData, error: transactionActivityError, isLoading: loadingTransactionActivity } = 
    useSWR<{ txns: WalletTransactionType }>(['/api/wallet-transactions-data', { walletAddress: address }], ([url, body]: [string, PostFetcherArgs]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });

    // Conditionally render component
    if (loadingTransactionActivity) {
        return <div>Loading Wallet Transactions Table...</div>
    }
    else if (transactionActivityError) {
        throw new Error();
    }
    else {
        // Render Account Transactions Activity
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Transactions History</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">Time Stamp</TableHead>
                            <TableHead className="text-gray-300">From</TableHead>
                            <TableHead className="text-gray-300">To</TableHead>
                            <TableHead className="text-gray-300">Direction</TableHead>
                            <TableHead className="text-gray-300">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        transactionActivityData?.txns?.result?.map((transaction, index: number) => { 
                            return (
                                <TableRow key={index} className="border-b border-gray-800">
                                    <TableCell className="text-gray-100">{new Date(Number(transaction.timeStamp)*1000).toISOString().split("T")[0] + ' ' + new Date(Number(transaction.timeStamp)*1000).toISOString().split("T")[1].split('.')[0]}</TableCell>
                                    <TableCell className="text-gray-300">{transaction.from}</TableCell>
                                    <TableCell className="text-gray-300">{transaction.to}</TableCell>
                                    <TableCell className={String(transaction.to).toLowerCase() === address.toLowerCase() ? 'text-green-500' : 'text-red-500'}>
                                        {String(transaction.to).toLowerCase() === address.toLowerCase() ? 'IN' : 'OUT'}
                                    </TableCell>
                                    <TableCell className="text-gray-300">{Number(transaction.value)/1e18 + ' ETH'}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </div>
        )
    }
}
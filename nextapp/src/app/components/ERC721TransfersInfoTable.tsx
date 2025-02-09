'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import ERC721TransfersType  from "../utils/types/ERC721TransfersType";

// Pass in the array of objects of type ERC721 Transfers to the data properties of the prop object
export default function ERC721TransfersInfoTable(props : { address: string, data: ERC721TransfersType }) {
    const { address, data } = props;

    // Render the Arbitrum ERC721 Transfers Info Table Component
    return (
        <div className="p-4 bg-gray-900 mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Transfers</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Block Number</TableHead>
                        <TableHead className="text-gray-300">Token Address</TableHead>
                        <TableHead className="text-gray-300">Token ID</TableHead>
                        <TableHead className="text-gray-300">From</TableHead>
                        <TableHead className="text-gray-300">To</TableHead>
                        <TableHead className="text-gray-300">Direction</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data?.result?.transfers.map((record, key) => {
                        return (
                            <TableRow key={key} className="border-b border-gray-800">
                                <TableCell className="font-medium text-gray-100">{ record.blockNum }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.rawContract.address }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.erc721TokenId }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.from }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.to }</TableCell>
                                <TableCell className={ record.to === address ? 'text-green-500' : 'text-red-500' }>
                                    { record.to === address ? 'IN' : 'OUT' }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
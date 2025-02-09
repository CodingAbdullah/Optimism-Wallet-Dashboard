'use client';

import ERC20TransfersType from '../utils/types/ERC20TransfersType';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function ERC720TransfersInfoTable(props : { data : ERC20TransfersType, address: string }) {
    const { data, address } = props;

    // Render the Optimism ERC20 Transfers Info Table Component
    return (
        <div className="p-4 bg-gray-900 mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Transfers</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Block Number</TableHead>
                        <TableHead className="text-gray-300">From</TableHead>
                        <TableHead className="text-gray-300">To</TableHead>
                        <TableHead className="text-gray-300">Category</TableHead>
                        <TableHead className="text-gray-300">Direction</TableHead>
                        <TableHead className="text-gray-300">Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                        data?.result?.transfers?.map((record, key) => {
                            // Display information, format date display
                            return (
                                <TableRow key={key} className="border-b border-gray-800">
                                    <TableCell className="font-medium text-gray-100">{ record.blockNum }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ record.from }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ record.to }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ record.category }</TableCell>
                                    <TableCell className={record.to.toLowerCase() === address.toLowerCase() ? 'text-green-500' : 'text-red-500' }>
                                        { record.to.toLowerCase() === address.toLowerCase() ? 'IN' : 'OUT' }
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-100">{ Number(record.value)/1000000000000000000 }</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
'use client';

import ERC20HoldingsType from "../utils/types/ERC20HoldingsType";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Pass in the array of objects of type ERC20 Holdings to the data properties of the prop object
export default function ERC20HoldingsInfoTable(props : { data: ERC20HoldingsType }) {
    const { data } = props;

    // Render the Optimism ERC20 Holdings Info Table Component
    return (
        <div className="p-4 bg-gray-900 mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Holdings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Contract Address</TableHead>
                        <TableHead className="text-gray-300">Token Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data?.result?.tokenBalances?.map((record, key) => {
                        return (
                            <TableRow key={key} className="border-b border-gray-800">
                                <TableCell className="font-medium text-gray-100">{ record.contractAddress }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.tokenBalance }</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
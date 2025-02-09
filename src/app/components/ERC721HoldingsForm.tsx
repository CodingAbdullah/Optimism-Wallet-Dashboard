'use client';

import { useRef, useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import addressValidator from '../utils/functions/addressValidator';
import ERC721HoldingsType from '../utils/types/ERC721HoldingsType';
import ERC721TransfersType from '../utils/types/ERC721TransfersType';
import ERC721HoldingsInfoTable from './ERC721HoldingsInfoTable';
import ERC721TransfersInfoTable from './ERC721TransfersInfoTable';

// ERC721 Holdings Form Custom Component
export default function ERC721HoldingsForm() {
    const walletAddressRef = useRef<HTMLInputElement>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [erc721Holdings, updateERC721Holdings] = useState<{ holdings: ERC721HoldingsType }>();
    const [erc721Transfers, updateERC721Transfers] = useState<{ transfers: ERC721TransfersType }>();

    // Handle Form Submissions here
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle Form Submission Logic here
        if (!addressValidator(walletAddressRef.current!.value.trim())){
            setShowAlert(true);
        }
        else {
            // FETCH API for retrieving ERC721 Holdings and Transfers data for a given wallet address
            setShowAlert(false);

            const erc721Holdings = await fetch('/api/optimism-erc721-holdings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: walletAddressRef.current!.value.trim() })
            });

            const erc721Transfers = await fetch('/api/optimism-erc721-transfers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: walletAddressRef.current!.value.trim() })
            });

            // Check the status of ERC721 Holdings Data
            if (erc721Holdings.ok) {
                const erc721HoldingsResponse = await erc721Holdings.json();
                updateERC721Holdings(erc721HoldingsResponse);
            }
            else {
                throw new Error();
            }

            // Check the status of ERC721 Transfers Data
            if (erc721Transfers.ok) {
                const erc721TransfersResponse = await erc721Transfers.json();
                updateERC721Transfers(erc721TransfersResponse);
            }
            else {
                throw new Error();
            }
        }
    }

    // Render the ERC721 Holdings Form component
    return (
        <>
            <div className="container mx-auto px-4 w-full max-w-3xl">
                {showAlert && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>
                            There was an error processing your request. Please try again.
                        </AlertDescription>
                    </Alert>
                )}
                <Card className="bg-gray-900 border-gray-800 shadow-xl w-full">
                    <CardHeader className="border-b border-gray-800 pb-6">
                        <CardTitle className="text-3xl font-bold text-gray-100">Analyze Holdings</CardTitle>
                        <CardDescription className="text-gray-400 text-lg font-light">
                            Enter wallet address for in-depth analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Enter Wallet Address"
                                ref={walletAddressRef}
                                type="text"
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                required
                            />
                            <div className="flex justify-center space-x-4 pt-4">
                                <Button 
                                    type="submit"
                                    className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                                >
                                    Analyze Holdings
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            { erc721Holdings ? <ERC721HoldingsInfoTable data={erc721Holdings.holdings} /> : null }
            { erc721Transfers ? <ERC721TransfersInfoTable data={erc721Transfers.transfers} address={walletAddressRef.current!.value.trim()} /> : null }
        </>
    )
}
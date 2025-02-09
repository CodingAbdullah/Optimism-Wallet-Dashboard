import { NextResponse } from "next/server";

const ALCHEMY_URL = 'https://opt-mainnet.g.alchemy.com';

export async function POST(request: Request) {
    const body = await request.json();
    
    // Pass in options making sure of the axios library and the Alchemy endpoint
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json', 
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id: 42,
            jsonrpc: '2.0',
            method: 'alchemy_getAssetTransfers',
            params: [
                {
                    fromBlock: '0x0',
                    toBlock: 'latest',
                    toAddress: body.walletAddress,
                    category: ['erc20'],
                    withMetadata: false,
                    excludeZeroValue: true,
                    maxCount: '0x3e8'
                }
            ]
        })
    };

    // Initiate request
    const erc20TransfersResponse = await fetch(ALCHEMY_URL + '/v2/' + process.env.ALCHEMY_API_KEY, options);
        
    // Conditionally return data
    if (!erc20TransfersResponse.ok) {
        return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }

    const data = await erc20TransfersResponse.json();
    
    return NextResponse.json({ 
        transfers: data 
    });
}
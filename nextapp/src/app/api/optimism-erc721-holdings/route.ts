import { NextResponse } from "next/server";

const ALCHEMY_URL = 'https://opt-mainnet.g.alchemy.com';

export async function POST(request: Request) {
    const body = await request.json();

    // Pass in options making sure of the axios library and the Alchemy endpoint
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        } as HeadersInit
    };

    // Initiate request for ERC721 holdings data
    const erc721HoldingsResponse = await fetch(ALCHEMY_URL + '/nft/v2/' + process.env.ALCHEMY_API_KEY + '/getNFTs?owner=' + body.walletAddress + '&withMetadata=true&pageSize=100', options);

    // Conditionally return data based on response
    if (!erc721HoldingsResponse.ok) {
        return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }

    // Return data if response status was 200
    const data = await erc721HoldingsResponse.json();
    
    return NextResponse.json({ 
        holdings: data 
    });
}
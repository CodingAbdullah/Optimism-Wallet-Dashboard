import { NextResponse } from "next/server";

const OPTIMISM_URL = 'https://api-optimistic.etherscan.io/api'

// Fetching Wallet balance data
export async function POST(request: Request){
    const body = await request.json();

    // Setting options parameters
    const options = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json'
        }
    }

    // Main transactions of a particular wallet on the Optimism network
    const walletInternalTransactionsResponse = await fetch(OPTIMISM_URL + '?module=account&action=txlistinternal&address=' + body.walletAddress + 
                '&startblock=0&endblock=99999999&page=1&sort=desc&apikey=' + process.env.OPTIMISM_API_KEY, options);

     // Conditionally return data based on response
     if (!walletInternalTransactionsResponse.ok) {
        return NextResponse.json({ error: 'Request for wallet internal transactions did not succeed' }, { status: 500 });
    }

    // Return data if response status was 200
    const data = await walletInternalTransactionsResponse.json();
    
    return NextResponse.json({ 
        txns: data 
    });
}
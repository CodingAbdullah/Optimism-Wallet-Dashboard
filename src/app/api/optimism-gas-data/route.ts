import hex2dec from "hex2dec";
import { NextResponse } from "next/server";

// Optimism Gas Endpoint
export async function GET(){

    // Retrieve Gas Information
    const options = {
        method: 'GET',
        headers: { 
            'accept': 'application/json', 
            'content-type': 'application/json' 
        } as HeadersInit
    };
    
    // Fetch Optimism gas data
    try {
        const gasMetricsResponse = await fetch("https://api-optimistic.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=" + process.env.OPTIMISM_API_KEY, options);
        const gasData = await gasMetricsResponse.json();

        // Return response with gas metrics data
        return NextResponse.json({ 
            chainInformation: gasData,
            gasPrice: Number(hex2dec.hexToDec(gasData.result))/1000000000 + " Gwei"
        });

    } 
    catch (err) {
        // Return error response
        return NextResponse.json({ error: err }, { status: 400 });
    }
}
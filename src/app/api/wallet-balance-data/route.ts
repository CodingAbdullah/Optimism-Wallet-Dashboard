import { NextResponse } from "next/server";

const OPTIMISM_URL = 'https://api-optimistic.etherscan.io/api';
const COINGECKO_URL = "https://pro-api.coingecko.com/api/v3";

// Fetching Wallet balance data
export async function POST(request: Request){
    const body = await request.json();

    // Setting options parameters
    const accountBalanceOptions = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json'
        }
    }

    // Setting options for authenticated API call
    const optimismPriceOptions = {
        method: "GET",
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
            'x-cg-pro-api-key' : process.env.COINGECKO_GENERIC_API_KEY // API-KEY for authenticated call
        } as HeadersInit
    }
    
    // Fetch Account Balance
    // Fetch Ethereum Price
    const accountBalanceResponse = await fetch(OPTIMISM_URL + "?module=account&action=balance&address=" + body.walletAddress + "&tag=latest&apikey=" + process.env.OPTIMISM_API_KEY, accountBalanceOptions);
    const ethereumPriceResponse = await fetch(COINGECKO_URL + "/simple/price?ids=ethereum&vs_currencies=usd", optimismPriceOptions)
    
    // Conditionally return data based on response
    if (!accountBalanceResponse.ok || !ethereumPriceResponse.ok) {
        return NextResponse.json({ error: 'Request for wallet transactions did not succeed' }, { status: 500 });
    }
    
    const accountBalance = await accountBalanceResponse.json();
    const ethereumPrice = await ethereumPriceResponse.json();

    // Return the balance information along with Ethereum price
    return NextResponse.json({
        balanceInformation: accountBalance,
        ethPrice: ethereumPrice.ethereum.usd
    });
}

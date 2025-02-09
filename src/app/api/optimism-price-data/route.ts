import { NextResponse } from "next/server";

const PRO_COINGECKO_URL = "https://pro-api.coingecko.com/api/v3"; // Pro CoinGecko API Endpoint

export async function GET(){
    const QUERY_STRING_OPTIMISM = "?ids=optimism&vs_currencies=usd&include_24hr_change=true";
    const API_ENDPOINT = "/simple/price";

    // Setting options for authenticated API call
    const options = {
        method: "GET",
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
            'x-cg-pro-api-key' : process.env.COINGECKO_GENERIC_API_KEY // API-KEY for authenticated call
        } as HeadersInit
    }

    // Run request and conditionally return data
    try {
        const optimismPriceResponse = await fetch(PRO_COINGECKO_URL + API_ENDPOINT + QUERY_STRING_OPTIMISM, options);

        // Formulate Arbitrum Price and Gas data
        const opPriceData = await optimismPriceResponse.json();

        // Return token price and gas information
        return NextResponse.json({
            tokenPrice: opPriceData
        });
    }
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}
// Adding type to handle complex gas/price data
export interface PriceType {
    gasInformation: { 
        jsonrpc: string,
        id: number,
        result: number
    },
    tokenPrice: {
        usd: number,
        usd_24h_change: number
    }
}
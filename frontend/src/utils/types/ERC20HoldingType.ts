// Adding interfaces to represent complex types
export interface ERC20HoldingType {
    jsonrpc: string,
    id: number,
    result: {
        address: string,
        tokenBalances: {
            contractAddress: string,
            tokenBalance: string,
            error?: string
        }[]
    }
}
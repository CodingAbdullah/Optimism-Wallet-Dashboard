// Adding interfaces to represent complex types
export interface ERC20HoldingType {
    id: number,
    jsonrpc: string,
    result: {
        address: string,
        tokenBalances: {
            contractAddress: string,
            tokenBalance: string,
            error: string
        }[]
    }
}
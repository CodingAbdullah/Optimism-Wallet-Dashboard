// Custom data type for ERC20 Holdings
export default interface ERC20HoldingsType {
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
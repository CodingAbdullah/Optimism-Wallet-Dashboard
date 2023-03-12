// Adding interfaces to represent complex types
export interface ERC20HoldingType {
    token_address: string,
    name: string,
    symbol: string,
    logo?: string,
    thumbnail?: string,
    decimals: number,
    balance: string
}
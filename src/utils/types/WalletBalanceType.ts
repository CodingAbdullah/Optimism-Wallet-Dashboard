// Adding interfaces to represent complex types
export interface WalletBalanceType {
    balanceInformation: {
        status: string,
        message: string,
        result: string
    },
    ethPrice: number
}
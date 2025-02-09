// Custom data type for Wallet Balance
export default interface WalletBalanceInfoType {
    balanceInformation: {
        status: string,
        message: string,
        result: string
    },
    ethPrice: number
}
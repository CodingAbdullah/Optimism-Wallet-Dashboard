// Custom data type for Wallet Internal Transactions
export default interface WalletInternalTransactionType {
    status: string,
    message: string,
    result: {
        blockNumber: string,
        timeStamp: string,
        hash: string,
        from: string,
        to: string,
        value: string,
        contractAddress: string,
        input: string,
        type: string,
        gas: string,
        gasUsed: string,
        traceId: string,
        isError: string,
        errCode: string
    }[]
}
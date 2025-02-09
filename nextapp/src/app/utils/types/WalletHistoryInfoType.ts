// Wallet History Data Type
export default interface WalletHistoryInfoType {
    address: string,
    active_chains: [{
        chain: string,
        chain_id: string,
        first_transaction: {
          block_number: string,
          block_timestamp: string,
          transaction_hash: string
        },
        last_transaction: {
          block_number: string,
          block_timestamp: string,
          transaction_hash: string
        }
    }]
}
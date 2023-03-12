// Adding interfaces to represent complex types
export interface ERC721HoldingType {
    holdings: {
        total: number,
        page: number,
        page_size: number,
        cursor: string,
        result : {
            token_address: string,
            token_id: string,
            amount: string,
            owner_of: string,
            token_hash: string,
            block_number_minted: string,
            contract_type: string,
            name: string,
            symbol: string,
            token_uri: string,
            metadata: string,
            last_token_uri_sync: string,
            last_metadata_sync: string,
            minter_address: string
        }[],
        status: string
    }
}
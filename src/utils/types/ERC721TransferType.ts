// Adding interfaces to represent complex types
export interface ERC721TransferType {
    jsonrpc: string,
    id: number,
    result: {
        transfers: {
            blockNum: string,
            uniqueId: string,
            hash: string,
            from: string,
            to: string,
            value: string,
            erc721TokenId: string,
            erc1155Metadata: string,
            tokenId: string,
            asset: string,
            category: string,
            rawContract: {
                value: string,
                address: string,
                decimal: string
            }
        }[]
    }
}

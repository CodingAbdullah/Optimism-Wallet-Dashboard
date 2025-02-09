// Custom data type for ERC721 Transfers
export default interface ERC721TransfersType {
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
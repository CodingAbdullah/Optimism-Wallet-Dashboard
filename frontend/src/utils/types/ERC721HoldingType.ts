// Adding interfaces to represent complex types
export interface ERC721HoldingType {
    ownedNfts: {
        contract : {
            address: string,
        },
        id: {
            tokenId: string
        },
        balance: string
    }[],
    totalCount: number,
    blockHash: string
}

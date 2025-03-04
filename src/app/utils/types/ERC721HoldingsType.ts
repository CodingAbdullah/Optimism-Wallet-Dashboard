// Custom data type for ERC721 Transfers
export default interface ERC721HoldingsType {
    ownedNfts: {
        contract : {
            address: string
        },
        id: {
            tokenId: string,
            tokenMetadata : {
                tokenType: string
            }
        },
        balance: string,
        title: string,
        description: string,
        tokenUri : {
            gateway: string,
            raw: string
        },
        media: {
            gateway: string,
            raw: string
        }[],
        timeLastUpdated: string,
        contractMetadata : {
            name: string,
            symbol: string,
            tokenType: string,
            contractDeployer: string,
            deployedBlockNumber: number,
            openSea : {
                collectionName: string,
                safelistRequestStatus: string,
                imageUrl: string,
                description: string,
                externalUrl: string,
                lastIngestedAt: string
            },
        },
        spamInfo: {
            isSpam: string,
            classifications: Array<string>
        }
    }[],
    pageKey?: string,
    totalCount: number,
    blockHash: string
}
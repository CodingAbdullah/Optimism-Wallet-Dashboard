import { ERC721HoldingType } from "../../utils/types/ERC721HoldingType";

const ERC721HoldingsInfoTable = (props: { data: ERC721HoldingType }) => {
    const { data } = props; // Destructure data

    return (
        <div style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Name</th>
                        <th style={{ border: '1px solid black' }} scope="col">Token Address</th>
                        <th style={{ border: '1px solid black' }} scope="col">Token ID</th>
                        <th style={{ border: '1px solid black' }} scope="col">Symbol</th>
                        <th style={{ border: '1px solid black' }} scope="col">Link</th>
                    </tr>
                </thead>
                <tbody style={{ border: '1px solid black' }}>
                    { data.ownedNfts.map((record, key) => {
                        return (
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '11px', padding: '0.5rem' }}>{ record.contractMetadata.name }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.contract.address }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.id.tokenId }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.contractMetadata.symbol }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}><a href={ "https://opensea.io/assets/optimism/" + record.contract.address + "/" + record.id.tokenId } target="_blank" rel="noreferrer">ERC721 Link</a></td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>   
        </div>
    )
}

export default ERC721HoldingsInfoTable;
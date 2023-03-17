import { ERC721TransferType } from "../../utils/types/ERC721TransferType";
import Badge from '../Badge/Badge';

const ERC721TransfersInfoTable = (props : { data: ERC721TransferType, address: string }) => {
    const { data, address } = props;

    return (
        <div style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                <tr style={{ border: '1px solid black' }}>
                    <th style={{ border: '1px solid black' }} scope="col">Hash</th>
                    <th style={{ border: '1px solid black' }} scope="col">Token Address</th>
                    <th style={{ border: '1px solid black' }} scope="col">ID</th>
                    <th style={{ border: '1px solid black' }} scope="col">Direction</th>                    
                    <th style={{ border: '1px solid black' }} scope="col">From</th>
                    <th style={{ border: '1px solid black' }} scope="col">To</th>
                </tr>
                </thead>
                <tbody>
                    { data.result.transfers.map((record, key) => {
                        // Display information, format date display
                            return (
                                <tr style={{ border: '1px solid black'}}>
                                    <td style={{ border: '1px solid black', fontSize: '11px', padding: '0.5rem' }}>{ record.hash }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.rawContract.address }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.tokenId }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ address.toLowerCase() === record.to ? <Badge type="IN" /> : <Badge type="OUT" /> }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.from }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.to }</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ERC721TransfersInfoTable;
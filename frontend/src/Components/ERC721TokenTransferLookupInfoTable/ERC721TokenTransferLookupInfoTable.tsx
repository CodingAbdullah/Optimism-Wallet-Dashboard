import { ERC721TransferLookupType } from '../../utils/types/ERC721TransferLookupType';

const ERC721TokenTransferLookupsInfoTable = (props : { data : ERC721TransferLookupType }) => {
    const { data } = props;

    // Display ERC721 token lookup information
    return (
        <>
            <div className='erc721-transfer-lookup-table'>
                <table style={{ border: '1px solid black' }}>
                    <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Date</th>
                        <th style={{ border: '1px solid black' }} scope="col">Transaction Hash</th>
                        <th style={{ border: '1px solid black' }} scope="col">From</th>
                        <th style={{ border: '1px solid black' }} scope="col">To</th>
                        <th style={{ border: '1px solid black' }} scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.lookupTransfers.result.map((record, key) => {
                                return (
                                    <tr>
                                        <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.block_timestamp.split("T")[0] }</td>
                                        <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.transaction_hash }</td>
                                        <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.from_address }</td>
                                        <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.to_address }</td>
                                        <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.amount }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ERC721TokenTransferLookupsInfoTable;
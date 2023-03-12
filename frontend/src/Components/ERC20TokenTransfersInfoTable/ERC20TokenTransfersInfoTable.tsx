import { ERC20TransferType } from '../../utils/types/ERC20TransferType';
import Badge from '../Badge/Badge';

const ERC720TransfersInfoTable = (props : { data : ERC20TransferType, address: string }) => {
    const { data, address } = props;

    return (
        <div className= "p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                <tr style={{ border: '1px solid black' }}>
                    <th style={{ border: '1px solid black' }} scope="col">Date</th>
                    <th style={{ border: '1px solid black' }} scope="col">From</th>
                    <th style={{ border: '1px solid black' }} scope="col">To</th>
                    { address !== null ? <th style={{ border: '1px solid black' }} scope="col">Direction</th> : null }                   
                    <th style={{ border: '1px solid black' }} scope="col">ERC-20 Quantity</th>
                </tr>
                </thead>
                <tbody>
                    { 
                        data.result.map((record, key) => {
                            // Display information, format date display
                            let recordedValue = Number(record.value)/1000000000000000000;
                            let badgeDisplay = address.toLowerCase() === record.to_address;

                            return (
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{ record.block_timestamp.split("T")[0] }</td>
                                    <td style={{ border: '1px solid black' }}>{ record.from_address }</td>
                                    <td style={{ border: '1px solid black' }}>{ record.to_address }</td>
                                    { 
                                        address !== null ? 
                                            <td style={{ border: '1px solid black', fontSize: '11px' }}>
                                                { badgeDisplay ? <Badge type="IN" /> : <Badge type="OUT" /> }
                                            </td> : null 
                                    }
                                    <td style={{ border: '1px solid black' }}>
                                        { recordedValue }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>  
    )
}

export default ERC720TransfersInfoTable;
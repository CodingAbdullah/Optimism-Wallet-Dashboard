import { ERC20HoldingType } from "../../utils/types/ERC20HoldingType";

// Pass in the array of objects of type ERC20Holding to the data properties of the prop object
const ERC20TokenHoldingsInfoTable = (props : { data: ERC20HoldingType }) => {
    const { data } = props;

    return (
        <div className="p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Contract Address</th>
                        <th style={{ border: '1px solid black' }} scope="col">Token Balance</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        data.result.tokenBalances.map((record, key) => {
                            return (
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>{ record.contractAddress }</td>
                                    <td style={{ border: '1px solid black', fontSize: '11px' }}>{ record.tokenBalance }</td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ERC20TokenHoldingsInfoTable;
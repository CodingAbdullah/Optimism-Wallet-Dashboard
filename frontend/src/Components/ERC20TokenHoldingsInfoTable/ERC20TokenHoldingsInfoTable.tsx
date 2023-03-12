import { ERC20HoldingType } from "../../utils/types/ERC20HoldingType";

// Pass in the array of objects of type ERC20Holding to the data properties of the prop object
const ERC20TokenHoldingsInfoTable = (props : { data: ERC20HoldingType[] }) => {
    const { data } = props;

    return (
        <div className="p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Name</th>
                        <th style={{ border: '1px solid black' }} scope="col">Token Address</th>
                        <th style={{ border: '1px solid black' }} scope="col">Symbol</th>
                        <th style={{ border: '1px solid black' }} scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((record, key) => {

                        if (record.name === null){ // Conditional Rendering.. no null names to be displayed
                            return null;
                        }
                        else {
                            return (
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{ record.name }</td>
                                    <td style={{ border: '1px solid black' }}>{ record.token_address }</td>
                                    <td style={{ border: '1px solid black' }}>{ record.symbol }</td>
                                    <td style={{ border: '1px solid black' }}>{ Number(record.balance)/1000000000000000000 }</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ERC20TokenHoldingsInfoTable;
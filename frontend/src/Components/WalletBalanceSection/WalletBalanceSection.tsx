import { WalletBalanceType } from "../../utils/types/WalletBalanceType";

const WalletBalanceSection = ( props: { data: WalletBalanceType , address: string }) => {
    const { data, address } = props;

    return (
        <div className="wallet-token-analytics-page p-3">
            <main role="main" className="pt-5">
                <div className="jumbotron">
                    <h3>Account: { address }</h3>
                    <h4>ETH Balance: { Number(data.balanceInformation.result)/1000000000000000000 } ETH (@ ${ data.ethPrice.toFixed(2) } USD/ETH )</h4>
                    <h6>Amount in USD: ${ (( Number(data.balanceInformation.result)/1000000000000000000 )*( data.ethPrice )).toFixed(2) } USD</h6>
                </div>
            </main>
        </div>
    )
}

export default WalletBalanceSection;
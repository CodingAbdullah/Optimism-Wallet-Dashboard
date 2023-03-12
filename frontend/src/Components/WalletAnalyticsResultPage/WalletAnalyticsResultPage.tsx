import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import WalletTransactionsInfoTable from '../WalletTransactionsInfoTable/WalletTransactionsInfoTable';
import WalletInternalTransactionsInfoTable from '../WalletInternatTransactionsInfoTable/WalletInternalTransactionsInfoTable';
import axios from 'axios';
import { WalletTransactionType } from '../../utils/types/WalletTransactionType';
import { WalletInternalTransactionType } from '../../utils/types/WalletInternalTransactionType';
import { WalletBalanceType } from '../../utils/types/WalletBalanceType';
import WalletBalanceSection from '../WalletBalanceSection/WalletBalanceSection';

const WalletAnalyticsResultPage: FC = () => {
    const navigate = useNavigate();
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);

    const [walletTransactionState, updateWalletTransactionState] = useState<WalletTransactionType>();
    const [walletInternalTransactionState, updateWalletInternalTransactionState] = useState<WalletInternalTransactionType>();
    const [walletBalanceInformationState, updateWalletBalanceInformationState] = useState<WalletBalanceType>();

    let address = localStorage.getItem('walletAddress') === null ? "" : localStorage.getItem('walletAddress');

    useEffect(() => {
        if (address === null || address.length !== 42 || address.substring(0, 2) !== '0x'){
            localStorage.clear(); // Clear storage, if any
            navigate('/');
        }
        else {
            let options = {
                method: "GET",
                body: JSON.stringify({ walletAddress: address }),
                headers : {
                    'content-type' : 'application/json'
                }
            }

            // Update transactions state with txns request
            axios.post('http://localhost:5001/op-transactions', options)
            .then(response => {
                if (response.data.txns.result.length === 0) {
                    updateEmptyAlert(true);
                }
                else {
                    updateEmptyAlert(false);
                    updateWalletTransactionState(response.data.txns);

                }
            })
            .catch(() => {
                updateEmptyAlert(true);
            });

            // Update internal transactions state with internal txns request
            axios.post('http://localhost:5001/op-internal-transactions', options)
            .then(response => {
                if (response.data.txns.result.length === 0) {
                    updateEmptyAlert(true);
                }
                else {
                    updateEmptyAlert(false);
                    updateWalletInternalTransactionState(response.data.txns);
                }
            })
            .catch(() => {
                updateEmptyAlert(true);
            });

            // Get ETH price along with wallet balance information
            axios.post('http://localhost:5001/op-wallet-balance', options)
            .then(response => {
                updateWalletBalanceInformationState(response.data);  
            });
        }
    }, []);

        if (walletInternalTransactionState === undefined && walletTransactionState === undefined && walletBalanceInformationState === undefined && !emptyAlert) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className="wallet-analytics-result-page p-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Wallet Analytics</h1>
                    </div>
                        { 
                            emptyAlert ? <Alert type="warning" /> : 
                            <>
                                {
                                    walletTransactionState === undefined ||  walletInternalTransactionState === undefined || walletBalanceInformationState == undefined || emptyAlert ? null :
                                        <>     
                                            <WalletBalanceSection data={ walletBalanceInformationState } address={ address! } />
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">Transactions</h3>
                                                </div>
                                            </main>
                                            <WalletTransactionsInfoTable address={ address! } data={ walletTransactionState! } /> 
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">Internal Transactions</h3>
                                                </div>
                                            </main>
                                            <WalletInternalTransactionsInfoTable address={ address! } data={ walletInternalTransactionState! } /> 
                                        </>
                                } 
                            </>
                        }
                </div>
            )
        }
}

export default WalletAnalyticsResultPage
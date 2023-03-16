import { FC, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import WalletTransactionsInfoTable from '../../Components/WalletTransactionsInfoTable/WalletTransactionsInfoTable';
import WalletInternalTransactionsInfoTable from '../../Components/WalletInternatTransactionsInfoTable/WalletInternalTransactionsInfoTable';
import { WalletTransactionType } from '../../utils/types/WalletTransactionType';
import { WalletInternalTransactionType } from '../../utils/types/WalletInternalTransactionType';
import axios from 'axios';
import WalletBalanceSection from '../WalletBalanceSection/WalletBalanceSection';
import { WalletBalanceType } from '../../utils/types/WalletBalanceType';

const WalletTokenAnalyticsPage: FC = () => {
    // Set hooks and state
    const navigate = useNavigate();
    const address = useRef<HTMLInputElement>(null);
    const [setAlert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);

    const [walletTransactionState, updateWalletTransactionState] = useState<WalletTransactionType>();
    const [walletInternalTransactionState, updateInternalTransactionState] = useState<WalletInternalTransactionType>();
    const [walletBalanceInformationState, updateWalletBalanceInformationState] = useState<WalletBalanceType>();

    const styles = {
        paragraphSpace: {
            paddingTop: '2rem'
        },
        form: {
            paddingBottom: '2rem'
        }
    }

    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        updateInternalTransactionState(undefined);
        updateWalletTransactionState(undefined);
        updateWalletBalanceInformationState(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent abnormal form submission

        if (address.current?.value.length !== 42 || address.current?.value.substring(0, 2) !== '0x') {
            updateEmptyAlert(false);
            updateAlert(true);
        }
        else {
            updateAlert(false);
            
            // Adding options to request body
            let options = {
                method: 'POST',
                body: JSON.stringify({ walletAddress: address.current?.value }),
                headers: {
                    'content-type' : 'application/json'
                }
            }

            // Requesting list of transactions
            axios.post("http://localhost:5001/op-transactions", options)
            .then(response => {
                if (response.data.txns.result.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateWalletTransactionState(response.data.txns);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // Request list of internal transactions
            axios.post("http://localhost:5001/op-internal-transactions", options)
            .then(response => {
                if (response.data.txns.result.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateInternalTransactionState(response.data.txns);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // Get Eth price along with wallet balance information
            axios.post('http://localhost:5001/op-wallet-balance', options)
            .then(response => {
                updateWalletBalanceInformationState(response.data);  
            });
        }
    }
    
    return ( 
        <div className="wallet-token-analytics-page p-3" style={{ textAlign: 'center' }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Wallet Analytics</h1>
            </div>
            
            { setAlert ? <Alert type="danger" /> : null } 
            { emptyAlert ? <Alert type="warning" /> : null } 
            <main role="main" className=" bg-light">
                <div className="jumbotron">
                    <div className="container">
                        <div style={ styles.paragraphSpace }>
                            <form style={ styles.form } onSubmit={ e => formHandler(e) }>
                                <label>Enter a <b>Wallet Address</b> for analytics:</label>
                                <input style={{ marginLeft: '0.5rem' }} type="text" ref={ address } placeholder='Enter Wallet Address' required  />
                                <br />
                                <button style={{ marginTop: '1rem' }} type="submit" className='btn btn-success'>Check Wallet</button>
                            </form>
                            <button style={{ display: 'inline', marginBottom: '2rem' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                            <button style={{ marginLeft: '2rem', marginBottom: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                        </div>     
                    </div>
                </div>
            </main>
            {
                walletBalanceInformationState === undefined || emptyAlert || setAlert ? null : 
                <WalletBalanceSection data={ walletBalanceInformationState } address={ address.current!.value } />
            }
            {
                walletTransactionState === undefined || emptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">Transactions (Limited to 1000)</h3>
                            </div>
                        </main>
                        <WalletTransactionsInfoTable address={ address.current!.value } data={ walletTransactionState } /> 
                    </>
            }
            {
                walletInternalTransactionState === undefined || emptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">Internal Transactions</h3>
                            </div>
                        </main>
                        <WalletInternalTransactionsInfoTable address={ address.current!.value } data={ walletInternalTransactionState } /> 
                    </>
            }

        </div>
    )
}

export default WalletTokenAnalyticsPage;
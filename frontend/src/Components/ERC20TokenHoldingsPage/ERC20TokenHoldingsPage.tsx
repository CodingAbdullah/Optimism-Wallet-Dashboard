import { FC, FormEvent, useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { ERC20HoldingType } from '../../utils/types/ERC20HoldingType';
import axios from 'axios';
import { ERC20TransferType } from '../../utils/types/ERC20TransferType';
import ERC20TokenHoldingsInfoTable from '../ERC20TokenHoldingsInfoTable/ERC20TokenHoldingsInfoTable';
import ERC20TokenTransfersInfoTable from '../ERC20TokenTransfersInfoTable/ERC20TokenTransfersInfoTable';

const ERC20TokenHoldingsPage: FC = () => {
    // Set up hooks and state
    const navigate = useNavigate();
    const address = useRef<HTMLInputElement>(null);
    const [alert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);
    const [tokenHoldings, updateTokenHoldings] = useState<ERC20HoldingType>(); // An array of these types must be stored in this state
    const [tokenTransfers, updateTokenTransfers] = useState<ERC20TransferType>(); 

    // Adding Handlers
    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        updateTokenHoldings(undefined);
        updateTokenTransfers(undefined);
    }

    const walletHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set configuration for request
        let options = {
            method: 'POST',
            body: JSON.stringify({ walletAddress: address.current?.value }),
            headers: {
                'content-type': 'application/json'
            }
        }

        if (address.current?.value.length !== 42 && address.current?.value.substring(0, 2) !== '0x') {
            updateEmptyAlert(false);
            updateAlert(true);
        }
        else {
            // Clear danger alert if the address fits the valid criteria
            updateAlert(false);

            // Make requests for ERC20 holdings and transfers
            axios.post('http://localhost:5001/op-erc20-holdings', options)
            .then(response => {
                if (response.data.holdings.result.tokenBalances[0].contractAddress === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' 
                    && response.data.holdings.result.tokenBalances[0].contractAddress === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                    updateEmptyAlert(true);
                }
                else {
                    updateEmptyAlert(false);
                    updateAlert(false);
                    updateTokenHoldings(response.data.holdings);

                    axios.post('http://localhost:5001/op-erc20-transfers', options)
                    .then(response => {
                        if (response.data.transfers.result.transfers.length === 0) {
                            updateEmptyAlert(true);
                        }
                        else {
                            updateEmptyAlert(false);
                            updateAlert(false);
                            updateTokenTransfers(response.data.transfers);
                        }
                    })
                    .catch(() => {
                        updateAlert(true);
                        updateEmptyAlert(false);
                    });
                }
            })
            .catch(() => {
                updateAlert(true);
                updateEmptyAlert(false);
            });
        }
    }

    return (
        <div className="erc-20-token-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC-20 Token Holdings</h2>
                </div>
                { alert ? <Alert type="danger" /> : null }
                { emptyAlert ? <Alert type="warning" /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <form onSubmit={ walletHandler }>
                            <label style={{ marginRight: '0.5rem' }}>Enter <b>Wallet Address</b> for ERC20 Token Holdings and Transfers: </label>
                            <input style={{ marginTop: '2rem' }} ref={address} type="text" placeholder="Enter Wallet Address" required />
                            <br />
                            <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-success">View Holdings</button>
                        </form>
                        <button style={{ marginTop: '2rem', display: 'inline', marginBottom: '1rem' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                        <button style={{ marginTop: '2rem', marginLeft: '2rem', marginBottom: '1rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                    </div>
                </div>
            </main>
            {
                tokenHoldings === undefined || emptyAlert || alert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} className="p-3" role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">ERC-20 Holdings</h3>
                            </div>
                        </main>
                        <ERC20TokenHoldingsInfoTable data={ tokenHoldings } /> 
                    </>
            }
            {
                tokenTransfers === undefined || emptyAlert || alert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} className="p-3" role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">ERC-20 Transfers</h3>
                            </div>
                        </main>
                        <ERC20TokenTransfersInfoTable address={ address.current!.value } data={ tokenTransfers } /> 
                    </>
            }
        </div>  
    )
}

export default ERC20TokenHoldingsPage;
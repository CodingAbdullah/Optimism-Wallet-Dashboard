import { FC, FormEvent, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import { ERC721HoldingType } from '../../utils/types/ERC721HoldingType';
import { ERC721TransferType } from '../../utils/types/ERC721TransferType';
import ERC721TokenHoldingsInfoTable from '../ERC721TokenHoldingsInfoTable/ERC721TokenHoldingsInfoTable';
import ERC721TokenTransfersInfoTable from '../ERC721TokenTransfersInfoTable/ERC721TokenTransfersInfoTable';
import Alert from '../Alert/Alert';
import axios from 'axios';

const ERC721TokenHoldingsPage: FC = () => {
    // Set up state and hooks
    const [alert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);

    const [erc721HoldingData, updateERC721HoldingData] = useState<ERC721HoldingType>();
    const [erc721TransferData, updateERC721TransferData] = useState<ERC721TransferType>();

    const address = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    
    // Clear and Form handlers
    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        updateERC721HoldingData(undefined);
        updateERC721TransferData(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (address.current?.value.length !== 42 || address.current.value.substring(0, 2) !== '0x'){
            updateEmptyAlert(false);
            updateAlert(true);
        }
        else {
            updateAlert(false);

            const options = {
                method: 'POST',
                body: JSON.stringify({ walletAddress: address.current?.value }),
                headers : {
                    'content-type': 'application/json'
                }
            }

            // Make calls to fetch ERC721 holdings and transfers of a particular wallet on the Arbitrum network
            axios.post('http://localhost:5001/op-erc721-holdings', options)
            .then(response => {
                // Check to see if length of holdings is equal to 0, if not populate state
                if (response.data.holdings.ownedNfts.length === 0) {
                    updateEmptyAlert(true);
                }
                else {
                    updateEmptyAlert(false);
                    updateERC721HoldingData(response.data.holdings);
                }
            })
            .catch(() => {
                updateAlert(true);
                updateEmptyAlert(false);
            });

            axios.post('http://localhost:5001/op-erc721-transfers', options)
            .then(response => {
                // Check to see if length of holdings is equal to 0, if not populate state
                if (response.data.transfers.result.transfers.length === 0) {
                    updateEmptyAlert(true);
                }
                else {
                    updateEmptyAlert(false);
                    updateERC721TransferData(response.data.transfers);
                }
            })
            .catch(() => {
                updateAlert(true);
                updateEmptyAlert(false);
            });
        }
    }
    
    return (
        <div className='erc-721-token-holdings-page'>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC-721 Token Holdings</h1>
                </div>
                { alert ? <Alert type="danger" /> : null }
                { emptyAlert ? <Alert type="warning" /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <form onSubmit={ (e) => formHandler(e) }>
                            <label>Enter <b>Wallet Address</b> for list of ERC-721 Holdings and Transfers:</label>
                            <input style={{ marginLeft: '0.5rem' }} ref={address} type='text' placeholder='Enter Wallet Address' />
                            <br />
                            <button style={{ marginTop: '1rem' }} type='submit' className='btn btn-success'>View Holdings</button>
                        </form>
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                        <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button> 
                    </div>
                </div>
            </main>
            { 
                emptyAlert ? null : 
                    <>
                        <main className="p-3" role="main">
                                <div>
                                    {
                                        erc721HoldingData === undefined || emptyAlert || alert ? null :
                                            <>
                                                <main style={{ marginTop: '5rem' }} role="main">
                                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                        <h3 className="h3">ERC-721 Token Holdings</h3>
                                                    </div>
                                                </main>
                                                <ERC721TokenHoldingsInfoTable data={ erc721HoldingData } />
                                            </>
                                    }
                                </div>
                        </main>
                        <main className="p-3" role="main">
                            <div>
                                {
                                    erc721TransferData === undefined || emptyAlert || alert ? null :
                                        <>
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">ERC-721 Transfers</h3>
                                                </div>
                                            </main>
                                            <ERC721TokenTransfersInfoTable address={ address.current!.value } data={ erc721TransferData } />
                                        </>
                                }
                            </div>
                        </main>
                    </>
            }
        </div>
    )

}

export default ERC721TokenHoldingsPage;

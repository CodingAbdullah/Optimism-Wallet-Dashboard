import { FC, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import ERC721TokenLookupsInfoTable from '../ERC721TokenLookupsInfoTable/ERC721TokenLookupsInfoTable';
import ERC721TokenTransferLookupsInfoTable from '../ERC721TokenTransferLookupInfoTable/ERC721TokenTransferLookupInfoTable';
import axios from 'axios';
import { ERC721LookupType } from '../../utils/types/ERC721LookupType';
import { ERC721TransferLookupType } from '../../utils/types/ERC721TransferLookupType';

const ERC721TokenLookupsPage: FC = () => {

    const address = useRef<HTMLInputElement>(null);    // Initialize ERC721 contract attributes
    const tokenID = useRef<HTMLInputElement>(null);
    
    // Adding hooks
    const [alert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);

    const [tokenData, updateTokenData] = useState<ERC721LookupType>();
    const [tokenTransfers, updateTokenTransfers] = useState<ERC721TransferLookupType>();

    const navigate = useNavigate();

    // Clear function to remove state and data
    const clearHandler = () => {
        updateTokenData(undefined);
        updateTokenTransfers(undefined);
        updateAlert(false);
        updateEmptyAlert(false);
    }

    const tokenHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent Default Behaviour

        const options = {
            method: 'POST',
            body: JSON.stringify({ walletAddress: address.current?.value, id: tokenID.current?.value }),
            headers: {
                'content-type' : 'application/json', 
            }
        }

        if (address.current?.value.length === 42 && address.current.value.substring(0, 2) === '0x'){
            axios.post('http://localhost:5001/op-erc721-token-lookup' , options)
            .then(response => {
                updateAlert(false); // Remove alerts if any exist
                updateEmptyAlert(false);
                updateTokenData(response.data);
            })
            .catch(() => {
                updateEmptyAlert(true);
            });

            axios.post('http://localhost:5001/op-erc721-token-transfers-lookup', options) // Get transfer data
            .then(response => {
                    if (response.data.lookupTransfers.result.length === 0){ // If empty, keep state to null
                        updateEmptyAlert(true);
                        updateAlert(false);
                    }
                    else {
                        updateEmptyAlert(false);
                        updateAlert(false);
                        updateTokenTransfers(response.data);
                    }
            })
            .catch(() => {
                updateEmptyAlert(true);       
            });
        }
        else {
            updateAlert(true);
        }
    }

    return (
        <div>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC-721 Token Lookup</h2>
                </div>
                { alert ? <Alert type="danger" /> : null }
                { emptyAlert ? <Alert type="warning" /> : null }
                <div className="jumbotron bg-light p-3">                    
                    <form onSubmit={ e => tokenHandler(e) }>
                        <p style={{ marginRight: '0.5rem' }}>Enter <b>ERC721 Contract Address</b> & <b>Token ID</b> for Lookup </p>
                        <input style={{ marginTop: '1rem' }} ref={ address } type="text" placeholder="Enter Contract Address" required />
                        <br />
                        <input style={{ marginTop: '1rem' }} ref={ tokenID } type="number" placeholder="Enter Token ID" required />
                        <br />
                        <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">View Lookup</button>
                    </form>
                    <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                    <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                </div>
            </main>
            <main className="p-3" role="main">
                <div>
                    {
                        tokenData === undefined || alert || emptyAlert ? null :
                            <>
                                <main style={{ marginTop: '5rem' }} role="main">
                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                        <h3 className="h3">ERC721 Token Lookup Information</h3>
                                    </div>
                                </main>
                                <ERC721TokenLookupsInfoTable data = { tokenData! }/>                                
                            </>
                    }
                </div>
            </main>
            <main className="p-3" role="main">
                    <div>
                        {
                            tokenTransfers === undefined || alert || emptyAlert ? null :
                                <>
                                    <main style={{marginTop: '5rem'}} role="main">
                                        <div style={{marginTop: '1rem'}} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                            <h3 className="h3">ERC721 Token Transfers</h3>
                                        </div>
                                    </main>
                                    <ERC721TokenTransferLookupsInfoTable data={ tokenTransfers! } />
                                </>
                        }
                    </div>
            </main>
        </div>
    )
}

export default ERC721TokenLookupsPage;
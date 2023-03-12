import { useEffect, useState } from 'react';
import axios from 'axios';
import { PriceType } from '../../utils/types/PriceType';

const MetricsNavbar = () => {
    const [priceInformation, updatePriceInformation] = useState<PriceType>();
    const [alert, updateAlert] = useState<boolean>(false);

    useEffect(() => {       
        const fetchInfo = async () => {
            // Upon render, run API call to collect data using information passed down from parent component, provided it is the mainnet
            const options = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                }
            }
            try {
                const response = await axios.get('http://localhost:5001/op-price-lookup-information', options); // Retrieve price information right after render                
                updatePriceInformation(response.data);
            }
            catch {
                updateAlert(true);
            }
        }
        fetchInfo();
    }, [])

    if ( priceInformation === undefined || alert ){
        return <div>Loading...</div>
    }
    else {
        // Adding another Navbar containing price information
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> 
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white', marginTop: '1rem'}}>OP Price: <b>{ priceInformation === undefined ? "Loading" : "$" + priceInformation.tokenPrice.usd.toFixed(2) }</b></p>
                            </li>
                            <li className="nav-item">
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white' }}>24-Hr % Chg:</p>
                                <p style={{ color: priceInformation.tokenPrice.usd_24h_change < 0 ? 'red' : 'lightgreen', marginTop: '1rem', display: 'inline' }}>
                                    <b>{ priceInformation.tokenPrice.usd_24h_change > 0 ? " +" + priceInformation.tokenPrice.usd_24h_change.toFixed(2) + "%" : " " + priceInformation.tokenPrice.usd_24h_change.toFixed(2) + "%" }</b>
                                </p> 
                            </li>
                            <li className="nav-item">
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white' }}>Gas Price:</p>
                                <p style={{ display: 'inline', color: 'white' }}><b>{ " " + priceInformation.gasInformation.result + " " }Gwei</b></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MetricsNavbar;
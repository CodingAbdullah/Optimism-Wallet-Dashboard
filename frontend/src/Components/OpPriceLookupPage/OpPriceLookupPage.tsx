import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { PriceHistoricalInformationType } from '../../utils/types/PriceHistoricalInformationType';
import { PriceType } from '../../utils/types/PriceType';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OpPriceLookupPage = () => {
    const navigate = useNavigate();
    const [opHistoricalInformation, updateOpHistoricalInformation] = useState<PriceHistoricalInformationType>();
    const [opPriceInformation, updateOpPriceInformation] = useState<PriceType>();
    const [displayChart, updateDisplayChart] = useState<string>('14'); // Display chart dates, default set to 15

    // Buttons for displaying different chart date ranges, used to update the diplay chart date, which triggers a re-render
    const buttonHandler = (d: string) : void => {
      switch(d) {
        case "Last Day":
          updateDisplayChart("1");
          break;   
        case "Last 14 Days":
          updateDisplayChart("14");
          break;
        case "Last 30 Days":
          updateDisplayChart("30");
          break;
        default:
          break;
      }
    }

    // Dependency is used to update chart rendering each case is considered and a separate API call is made for each scenario
    useEffect(() => {
        const fetchCoins = () => {
            let options = {
                method: 'POST',
                body: JSON.stringify({ day: '14' }),
                headers : {
                    'content-type' : 'application/json'
                }
            }

                // Set up request and retrive information related to price and organize state
                // const response = await axios.post('http://localhost:5001/get-op-price-historical-information', options);
                // const priceResponse = await axios.get('http://localhost:5001/op-price-lookup-information');
                axios.post('http://localhost:5001/op-price-historical-information', options)
                .then(response => {

                    const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); // Set timeout for coin price display
                    delay();

                    axios.get("http://localhost:5001/op-price-lookup-information")
                    .then(priceResponse => {                            
                        // Format dates
                        let days = [];
                        if (Number(displayChart) === 1) {
                            for (var i = 1; i < 25; i++){
                                days.push(moment().subtract(i, 'hours').calendar());
                            }                    
                        }
                        else if (Number(displayChart) === 14){
                            for (var j = 1; j < Number(displayChart) + 1; j++){
                                days.push(moment().subtract(j, 'days').calendar());
                            }
                        }
                        else if (Number(displayChart) === 30){
                            for (var k = 1; k < Number(displayChart) + 1; k++){
                                days.push(moment().subtract(k, 'days').calendar());
                            }
                        }

                        let historicalInformation: PriceHistoricalInformationType = {
                            prices: response.data.prices,
                            time: days.reverse()
                        }
                        updateOpHistoricalInformation(historicalInformation);
                        updateOpPriceInformation(priceResponse.data);
                    })
                    .catch(() => {
                        updateOpHistoricalInformation(undefined);
                        updateOpPriceInformation(undefined);
                    });
                })
                .catch(() => {
                    updateOpHistoricalInformation(undefined);
                    updateOpPriceInformation(undefined);
                });
        }
        // Run function upon component mount
        fetchCoins();
    }, []);

    // Adding multiple useEffect hooks for different chart ranges
    // Dependency is used to update chart rendering each case is considered and a separate API call is made for each scenario
    useEffect(() => {
        const fetchCoins = () => {
            let options = {
                method: 'POST',
                body: JSON.stringify({ day: displayChart }),
                headers : {
                    'content-type' : 'application/json'
                }
            }
            
            // Set up request and retrive information related to price and organize state
            // const response = await axios.post('http://localhost:5001/get-op-price-historical-information', options);
            // const priceResponse = await axios.get('http://localhost:5001/op-price-lookup-information');

                axios.post('http://localhost:5001/op-price-historical-information', options)
                .then(response => {

                    const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); // Set timeout for coin price display
                    delay();

                    axios.get("http://localhost:5001/op-price-lookup-information")
                    .then(priceResponse => {                            
                        // Format dates
                        let days = [];
                        if (Number(displayChart) === 1) {
                            for (var i = 1; i < 25; i++){
                                days.push(moment().subtract(i, 'hours').calendar());
                            }                    
                        }
                        else if (Number(displayChart) === 14){
                            for (var j = 1; j < Number(displayChart) + 1; j++){
                                days.push(moment().subtract(j, 'days').calendar());
                            }
                        }
                        else if (Number(displayChart) === 30){
                            for (var k = 1; k < Number(displayChart) + 1; k++){
                                days.push(moment().subtract(k, 'days').calendar());
                            }
                        }

                        let historicalInformation: PriceHistoricalInformationType = {
                            prices: response.data.prices,
                            time: days.reverse()
                        }
                        updateOpHistoricalInformation(historicalInformation);
                        updateOpPriceInformation(priceResponse.data);
                    })
                    .catch(() => {
                        updateOpHistoricalInformation(undefined);
                        updateOpPriceInformation(undefined);
                    });
                })
                .catch(() => {
                    updateOpHistoricalInformation(undefined);
                    updateOpPriceInformation(undefined);
                });
        }
        // Run function upon component mount
        fetchCoins();
    }, [displayChart, updateDisplayChart]);

    // Set display configurations
    var data = {
        labels: opHistoricalInformation?.time,
        datasets: [{
        label:  'Optimism Price',
        data: opHistoricalInformation?.prices?.map(x => x[1].toFixed(2)),
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1
        }]
    };

    // Adding options to enhance charts
    var chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Optimism Chart"
            },
            legend: {
                display: true,
                position: "bottom"
            }
        }   
    }

    let buttonDaysArray = ["Last Day", "Last 14 Days", "Last 30 Days"];
    let buttons = buttonDaysArray.map((day, key) =>  {
        return <button onClick={ () => buttonHandler(day) } style={{ marginTop: '2rem', marginRight: '1rem', marginBottom: '5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }} className="btn btn-secondary">{day}</button>
    });

    // Display Title, 24 Hr. Price% Change, Price of Coin
    if (opPriceInformation === undefined || opHistoricalInformation === undefined) {
        return <div role="main">Loading...</div>
    }
    else {
        // Generic coin setup using Object keys from API responses to generate output
        return (
        <div>
            <main role="main">
            <h3 style={{ marginTop: '2rem' }}>Optimism Price: 
                <b style={{ marginLeft: '0.25rem' }}>
                ${ opPriceInformation.tokenPrice.usd >= 1 ? 
                ( opPriceInformation.tokenPrice.usd).toFixed(2) : 
                opPriceInformation.tokenPrice.usd } USD
                </b>
            </h3> 
            <h5 style={{ marginBottom: '2rem', display: 'inline' }}>24-Hr % Chg:
                { opPriceInformation.tokenPrice.usd_24h_change < 0 ? 
                <h5 style={{ display: 'inline', color: 'red' }}>{" " + opPriceInformation.tokenPrice.usd_24h_change.toFixed(2) + "%" }</h5> : 
                <h5 style={{ display: 'inline', color: 'green' }}>{" +" + opPriceInformation.tokenPrice.usd_24h_change.toFixed(2) + "%" }</h5>
                }
                </h5>
            <br />
            <div>
                {( opHistoricalInformation === undefined || opPriceInformation === undefined ) ? <div>Loading...</div> : 
                <div style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <Line 
                    data={data}
                    height={250}
                    width={250}
                    />
                </div>
                }
            </div>
            <div className="button-section" style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                { buttons }
            </div>
            <div>
                <button className="btn btn-success" style={{ marginRight: '0.25rem' }} onClick={ () => navigate("/") }>Go To Dashboard</button>
            </div>
            </main>
        </div>
        )
    }
}

export default OpPriceLookupPage;
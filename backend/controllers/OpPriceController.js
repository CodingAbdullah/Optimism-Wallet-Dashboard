require("dotenv").config({ path: '../.env' });
const COINGECKO_URL = require("../utils/constants").NETWORK_MAPPER.coingecko_url;
const axios = require('axios');
const hex2dec = require('hex2dec');

exports.getOptimismPriceInformation = (req, res) => {
    const QUERY_STRING_OPTIMISM = "?ids=optimism&vs_currencies=usd&include_24hr_change=true";
    const API_ENDPOINT = "/simple/price";
    const OPTIMISM_GAS_URL =  "?module=proxy&action=eth_gasPrice&apikey=" + process.env.OPTIMISM_API_KEY

    axios.get(COINGECKO_URL + API_ENDPOINT + QUERY_STRING_OPTIMISM)
    .then(response => {

        const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); // Set timeout for coin price display
        delay();

        axios.get(NETWORK_MAPPER.optimism_url + OPTIMISM_GAS_URL)
        .then(gasInfo => {
            let gasValueInDec = (hex2dec.hexToDec(gasInfo.data.result))/1000000000; // Value given in WEI Hex value so, conversion to Dec value and to WEI is done
            gasInfo.data.result = gasValueInDec;

            // If price action data fetch and gas price data fetch is successful, send back modified response
            res.status(200).json({
                gasInformation: gasInfo.data,
                tokenPrice: response.data['optimism']
            });
        })
        .catch(err => {
            // Send back error
            res.status(400).json({
                error: err
            });
        });
    })
    .catch(err => {
        // Send back error
        res.status(400).json({
            error: err
        });
    });
}

exports.getOptimismHistoricalPriceInformation = (req, res) => {
    // Check to see if the parameters exist and are valid, run to check prices, selection area for the different coins
    const { day }  = JSON.parse(req.body.body);
    
    let duration = day == '1' ? 'hourly' : 'daily';

    const QUERY_STRING_PRICES = "?vs_currency=usd&days=" + day; // Default selection for now.
    const PRICE_ENDPOINT = "/coins/optimism/market_chart" + QUERY_STRING_PRICES + "&interval=" + duration;

    const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); // Set timeout for coin price display
    delay();

    // Gather data related to token price, 24 hr change and the price range selected by user    
    axios.get(COINGECKO_URL + PRICE_ENDPOINT)
    .then(historicalInformation => {
        console.log(historicalInformation);
        res.status(200).json({
            historicalPrice: historicalInformation.data
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}
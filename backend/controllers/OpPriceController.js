require("dotenv").config({ path: '../.env' });
const { NETWORK_MAPPER } = require("../utils/constants");
const axios = require('axios');
const hex2dec = require('hex2dec');

exports.getOptimismPriceInformation = (req, res) => {
    const QUERY_STRING_OPTIMISM = "?ids=optimism&vs_currencies=usd&include_24hr_change=true";
    const API_ENDPOINT = "/simple/price";
    const OPTIMISM_GAS_URL =  "?module=proxy&action=eth_gasPrice&apikey=" + process.env.OPTIMISM_API_KEY

    axios.get(NETWORK_MAPPER.COINGECKO_URL + API_ENDPOINT + QUERY_STRING_OPTIMISM)
    .then(response => {

        axios.get(NETWORK_MAPPER.OPTIMISM_URL + OPTIMISM_GAS_URL)
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
        })
    })
    .catch(err => {
        // Send back error
        res.status(400).json({
            error: err
        });
    })
}


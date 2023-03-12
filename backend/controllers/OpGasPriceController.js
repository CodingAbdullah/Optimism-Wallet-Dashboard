require("dotenv").config({ path: '../.env' });
const axios = require('axios');
const OPTIMISM_URL = require("../utils/constants").NETWORK_MAPPER.OPTIMISM_URL;
const hex2dec = require("hex2dec");

// Optimism endpoint
exports.getGasPrice = (req, res) => {
    // Retrieve Gas Information
    const options = {
        method: 'GET',
        headers: { 
            'accept': 'application/json', 
            'content-type': 'application/json' 
        }
    };
    
    // Make a post request for gas data on Arbitrum
    axios.get(OPTIMISM_URL + "?module=proxy&action=eth_gasPrice&apikey=" + process.env.OPTIMISM_API_KEY, options)
    .then(response => {
        // Gas is given in WEI in HEX format, convert to Decimal and divide by 10^9 for GWEI evaluation
        res.status(200).json({
            chainInformation: response.data,
            gasPrice: hex2dec.hexToDec(response.data.result)/1000000000 + " Gwei"
        });
    })
    .catch(err => {
        // Send back error that is caught
        res.status(400).json({
            error: err
        });
    });
}
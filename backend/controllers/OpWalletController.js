require("dotenv").config({ path: '../.env' });
const axios  = require("axios");
const OPTIMISM_URL = require("../utils/constants").NETWORK_MAPPER.OPTIMISM_URL;
const COINGECKO_URL = require("../utils/constants").NETWORK_MAPPER.COINGECKO_URL;

exports.getWalletTransactions = (req, res) => {
    const { walletAddress } = JSON.parse(req.body.body);

    // Main transactions of a particular wallet on the Arbitum network
    axios.get(OPTIMISM_URL + '?module=account&action=txlist&address=' + walletAddress + 
                '&startblock=0&endblock=99999999&page=1&sort=desc&apikey=' + process.env.OPTIMISM_API_KEY)
    .then(response => {
        res.status(200).json({
            txns: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}

exports.getInternalWalletTransactions = (req, res) => {
    const { walletAddress } = JSON.parse(req.body.body);

    // Internal transactions of a particular wallet on the Arbitrum network
    axios.get(OPTIMISM_URL + '?module=account&action=txlistinternal&address=' + walletAddress + 
                '&startblock=0&endblock=99999999&page=1&sort=desc&apikey=' + process.env.OPTIMISM_API_KEY)
    .then(response => {
        res.status(200).json({
            txns: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}

exports.getWalletBalance = (req, res) => {
    const walletAddress = JSON.parse(req.body.body);

    // Get Account Balance
    axios.get(OPTIMISM_URL + "?module=account&action=balance&address=" + walletAddress.walletAddress + "&tag=latest&apikey=" + process.env.OPTIMISM_API_KEY)
    .then(response => {  
        // Once wallet information is fetched, make another call for the ETH price
        axios.get(COINGECKO_URL + "simple/price?ids=ethereum&vs_currencies=usd")
        .then(coingeckoInformation => {
            res.status(200).json({
                balanceInformation: response.data,
                ethPrice: coingeckoInformation.data.ethereum.usd
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}
require("dotenv").config({ path: '../.env' });
const ALCHEMY_URL = require("../utils/constants").NETWORK_MAPPER.alchemy_url;
const axios = require("axios");

exports.getERC721Holdings = (req, res) => { 
    const { walletAddress } = JSON.parse(req.body.body);

    // Pass in options making sure of the axios library and the Alchemy endpoint
    const options = {
        method: 'GET',
        url: ALCHEMY_URL + 'nft/v2/' + process.env.ALCHEMY_API_KEY + '/getNFTs?owner=' + walletAddress + '&withMetadata=true&pageSize=100',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    };

    // POST request using Axios 
    axios.request(options)
    .then(response => {
        res.status(200).json({
            holdings: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });

}  

exports.getERC721Transfers = (req, res) => {
    const { walletAddress } = JSON.parse(req.body.body);

    // Pass in options making sure of the axios library and the Alchemy endpoint
    const options = {
        method: 'POST',
        url: ALCHEMY_URL + '/v2/' + process.env.ALCHEMY_API_KEY,
        headers: {
            accept: 'application/json', 
            'content-type': 'application/json'
        },
        data: {
            id: 42,
            jsonrpc: '2.0',
            method: 'alchemy_getAssetTransfers',
            params: [
                {
                    fromBlock: '0x0',
                    toBlock: 'latest',
                    toAddress: walletAddress,
                    category: ['erc721'],
                    withMetadata: false,
                    excludeZeroValue: true,
                    maxCount: '0x3e8'
                }
            ]
        }
    };

    // POST request using Axios 
    axios.request(options)
    .then(response => {
        res.status(200).json({
            transfers: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}
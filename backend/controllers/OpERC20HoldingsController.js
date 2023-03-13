require("dotenv").config({ path: '../.env' });
const axios = require("axios");

exports.getERC20Holdings = (req, res) => {
    const { walletAddress }  = JSON.parse(req.body.body);

    // Replace with your Alchemy API key:
    const baseURL = 'https://opt-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMY_API_KEY;
    var data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "alchemy_getTokenBalances",
        "params": [
            `${walletAddress}`,
        ],
        "id": 42
    });

    var config = {
        method: 'post',
        url: baseURL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
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

exports.getERC20Transfers = (req, res) => {
    const address = JSON.parse(req.body.body).walletAddress;

    const options = {
        method: 'POST',
        url: 'https://opt-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMY_API_KEY,
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
          params: [
            {
              fromBlock: '0x0',
              toBlock: 'latest',
              category: ['erc20'],
              withMetadata: false,
              excludeZeroValue: true,
              maxCount: '0x3e8',
              fromAddress: address,
              order: 'desc'
            }
          ]
        }
    };
      
    axios.post(options)
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
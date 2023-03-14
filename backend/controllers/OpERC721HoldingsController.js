require("dotenv").config({ path: '../.env' });
const ALCHEMY_URL = require("../utils/constants").NETWORK_MAPPER.alchemy_url;
const axios = require("axios");

exports.getERC721Holdings = (req, res) => { 
    const address = JSON.parse(req.body.body).walletAddress;

    axios.get(ALCHEMY_URL + '/nft/v2/' + process.env.ALCHEMY_API_KEY + "/getNFTS?owner=" + address + "&withMetadata=false&pageSize=100")
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}  

exports.getERC721Transfers = (req, res) => {
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
              category: ['erc721'],
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
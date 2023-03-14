const express = require("express");
const router = express.Router();
const OpERC721HoldingsController = require("../controllers/OpERC721HoldingsController");

// Adding routes here
router.post("/op-erc721-holdings", OpERC721HoldingsController.getERC721Holdings);
router.post("/op-erc721-transfers", OpERC721HoldingsController.getERC721Transfers);

module.exports = router;
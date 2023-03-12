const express = require("express");
const router = express.Router();
const OpERC721LookupsController = require("../controllers/OpERC721LookupsController");

// Add routes here
router.post("/op-erc721-token-lookup", OpERC721LookupsController.erc721TokenLookup);
router.post("/op-erc721-token-transfers-lookup", OpERC721LookupsController.erc721TokenTransferLookup);

module.exports = router;
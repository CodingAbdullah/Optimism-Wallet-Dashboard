const express = require("express");
const router = express.Router();
const OpERC20HoldingsController = require("../controllers/OpERC20HoldingsController");

// Adding routes here
router.post("/op-erc20-holdings", OpERC20HoldingsController.getERC20Holdings);
router.post("/op-erc20-transfers", OpERC20HoldingsController.getERC20Transfers);

module.exports = router;
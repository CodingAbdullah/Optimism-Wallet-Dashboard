const express = require("express");
const router = express.Router();
const ArbWalletController = require("../controller/ArbWalletController");

// Add routes here
router.post("/op-transactions", ArbWalletController.getWalletTransactions);
router.post("/op-internal-transactions", ArbWalletController.getInternalWalletTransactions);
router.post("/op-wallet-balance", ArbWalletController.getWalletBalance);

module.exports = router;
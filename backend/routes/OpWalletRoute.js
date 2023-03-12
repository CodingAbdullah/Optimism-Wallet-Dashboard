const express = require("express");
const router = express.Router();
const OpWalletController = require("../controllers/OpWalletController");

// Add routes here
router.post("/op-transactions", OpWalletController.getWalletTransactions);
router.post("/op-internal-transactions", OpWalletController.getInternalWalletTransactions);
router.post("/op-wallet-balance", OpWalletController.getWalletBalance);

module.exports = router;
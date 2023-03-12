const express = require("express");
const router = express.Router();
const OpGasPriceController = require("../controllers/OpGasPriceController");

// Add route to fetch gas data
router.get("/op-gas-tracker", OpGasPriceController.getGasPrice);

module.exports = router;
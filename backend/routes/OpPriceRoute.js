const express = require("express");
const router = express.Router(); // Adding router
const OpPriceController = require("../controllers/OpPriceController");

// Adding routes for information
router.get("/op-price-lookup-information", OpPriceController.getOptimismPriceInformation);
router.post("/op-price-historical-information", OpPriceController.getOptimismHistoricalPriceInformation);

module.exports = router;
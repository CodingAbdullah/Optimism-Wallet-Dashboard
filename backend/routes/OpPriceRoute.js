const express = require("express");
const router = express.Router(); // Adding router
const OpPriceController = require("../controllers/OpPriceController");

// Adding routes for information
router.get("/get-op-price-information", OpPriceController.getOptimismPriceInformation);

module.exports = router;
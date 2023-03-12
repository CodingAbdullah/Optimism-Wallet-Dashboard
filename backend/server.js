require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const OpPriceRoute = require("../backend/routes/OpPriceRoute");
const OpGasPriceRoute = require("../backend/routes/OpGasRoute");
const OpWalletRoute = require("../backend/routes/OpWalletRoute");
const OpERC20HoldingsRoute = require('../backend/routes/OpERC20HoldingsRoute');
const OpERC721HoldingsRoute = require("../backend/routes/OpERC721HoldingsRoute");
const OpERC721LookupsRoute = require("../backend/routes/OpERC721LookupsRoute");

const app = express();

// Spin up a node server
app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
});

app.use(cors()); // Cors-enabled server
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Add routes to server
app.use("/", OpPriceRoute);
app.use("/", OpGasPriceRoute);
app.use("/", OpWalletRoute);
app.use("/", OpERC20HoldingsRoute);
app.use("/", OpERC721HoldingsRoute)
app.use("/", OpERC721LookupsRoute)
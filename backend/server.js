require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const OpPriceRoute = require("../backend/routes/OpPriceRoute");
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

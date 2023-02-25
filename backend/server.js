require("dotenv").config({ path: '.env' });
const express = require("express");
const app = express();

// Spin up a node server
app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
})
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();



app.listen(3000, () => {
    console.log("Listening to port 3000");
});
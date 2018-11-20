const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            { 
                email_address: email,
                status: "subscribed",
                "merge_fields": {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var proxyUrl = "http://proxy.krzn.de:3128";

    var proxiedRequest = request.defaults({'proxy': proxyUrl});
    
    var options = {
        uri: "https://us19.api.mailchimp.com/3.0/lists/34d749ee71",
        method: "POST",
        headers:{
            "Authorization":"nausmeister 4a4392012b6aa3a1c7ce910630380d95-us19"
        },
        body: jsonData
    };
    
    proxiedRequest.post(options, (error, resp, body) => {
        console.log(resp);
    });


});

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/signup.html");
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});
// API Key
// 4a4392012b6aa3a1c7ce910630380d95-us19
//list Key
//8e9f50b0b6
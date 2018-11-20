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

    var proxyUrl = "";

    var proxiedRequest = request.defaults({'proxy': proxyUrl});
    
    var options = {
        uri: "https://us19.api.mailchimp.com/3.0/lists/34d749ee71",
        method: "POST",
        headers:{
            "Authorization":"nausmeister 52bd66c83ab8964be8967b01c3f3dd96-us19"
        },
        body: jsonData
    };
    
    // proxiedRequest.post(options, (error, resp, body) => {
    //     console.log(resp.statusCode);
    // });

    request(options, (error, resp, body) => {
        var statusCode = resp.statusCode;
        if(error || statusCode !== 200 ){
            res.sendFile(__dirname + "/failure.html");
        } else {
            res.sendFile(__dirname + "/success.html");
        }
    });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening to port 3000");
});
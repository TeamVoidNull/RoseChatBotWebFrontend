var express = require("express")
var app = express();
var bodyParser = require("body-parser");

// Temp response phrases -- delete later
let phrases = ["Good thinking", 
    "A valid opinion", 
    "What wise words",
    "Talk to me more"]

app.use('/', express.static("public") );
app.use('/send', bodyParser.text());

//introduce delay to make it look nice
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

app.post('/send', async function(req, res){
    console.log("Recieved a message: " + req.body);
    delay(1000).then(() =>
        res.send(phrases[Math.floor(Math.random() * phrases.length)])
    );
})

app.listen( 8080 ); 
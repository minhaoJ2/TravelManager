const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');//pagerank things
const app = express();
// var cors = require('cors');
// app.use(cors);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "welcome to travel manager."});
});
//flight
require("./app/routes/flight.routes.js")(app);
//airline
require("./app/routes/airline.routes.js")(app);
//model
require("./app/routes/model.routes.js")(app);

app.get('/rank', (req, res) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['PageRankWeighted.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(JSON.parse(dataToSend))
    });
})



app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
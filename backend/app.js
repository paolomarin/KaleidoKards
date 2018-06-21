const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var KaleidoKards = require('./utils/kaleidoKards.js');
var KaleidoConfig = require('./utils/KaleidoConfig.js');


app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.post('/launch', (req, res) => {
    // req.apiKey;
    // console.log(req.body.apiKey);
    console.log(JSON.stringify(req.body));
    // var kaleidoConfig = new KaleidoConfig("");
    var kaleidoKardsInstance = new KaleidoKards();
    console.log("*****HERE*****");
    console.log(kaleidoKardsInstance);
    console.log("In APP.JS", kaleidoKardsInstance.contractAddress);
    res.status(200).send(kaleidoKardsInstance.contractAddress);
});

app.post('/purchase', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.status(200).send({name: 'fred'})
});

app.listen(3001, () => {
   console.log('listening on port 3000');
});

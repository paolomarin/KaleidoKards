const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var KaleidoKards = require('./utils/kaleidoKards.js');
var KaleidoConfig = require('./utils/KaleidoConfig.js');

var kaleidoKardsInstance;
var kaleidoConfigInstance;

app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// only returns contract address for now
app.post('/launch', (req, res) => {

    if (kaleidoKardsInstance && kaleidoKardsInstance.deployed) {
        res.status(200).send({contractAddress: kaleidoKardsInstance.contractAddress});
        return;
    }

    if (!req.body.apiKey) {
        res.status(500).send({error: "No Api Key in body"});
        return;
    }


    var kaleidoKardConfig = new KaleidoConfig(req.body.apiKey);
    if (kaleidoKardConfig.previousInstance) {
        kaleidoKardsInstance = new KaleidoKards();
        kaleidoKardsInstance.contractAddress = kaleidoKardConfig.contractAddress;
        res.status(200).send({contractAddress: kaleidoKardsInstance.contractAddress});
        return;
    }

    // Previous instance does'n exist
    // console.log("No previous instance found!");
    // console.log("***Creating new kaleidoConfig now");
    kaleidoKardConfig.launch().then((response) => {
        // console.log("kaleidoconfig.then");
        kaleidoKardsInstance = new KaleidoKards();
        kaleidoKardsInstance.deploy().then(() => {
            // console.log("contractinstance.then");
            kaleidoKardConfig.contractAddress = kaleidoKardsInstance.contractAddress;
            kaleidoKardConfig.writeKeyFile();
            res.status(200).send({contractAddress: kaleidoKardsInstance.contractAddress});
            return;
        }).catch((error) => {
            console.log("Here's an error ", error);

            res.status(500).send({error: error});
            return;
        });
    }).catch((error) => {
        console.log("Here's an error from launching th env ", error);

        res.status(500).send({error: error});
    });

});


app.post('/purchase/standard', (req, res) => {
    // console.log(kaleidoKardsInstance.contractAddress);
    console.log(JSON.stringify(req.body));
    res.status(200).send([{color:0, shape: 0},{color:1, shape:1}, {color:2, shape:2}, {color:3, shape:3}, {color:4, shape:4} ] )
});

app.post('/purchase/platinum', (req, res) => {
    // console.log(kaleidoKardsInstance.contractAddress);
    console.log(JSON.stringify(req.body));
    res.status(200).send([{color:0, shape: 0},{color:1, shape:1}, {color:2, shape:2}, {color:3, shape:3}, {color:4, shape:4} ] )
});

app.listen(3000, () => {
   console.log('listening on port 3000');
});

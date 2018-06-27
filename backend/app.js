const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var controller = new (require('./controller.js'))();
controller.checkKeyFile();

app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// only returns contract address for now
app.post('/launch', (req, res) => {
    controller.launchAppEnv(req.body.apiKey).then((response) => {
        res.status(response.status).send(response.body);
    });
});


app.post('/purchase/standard', (req, res) => {

    if (!req.body.purchaser){
        // purchaser should be, user, joe, or kard_store
        res.status(400).send({error: "Purchaser not specified"});
        return;
    }

    controller.purchaseStandard(req.body.purchaser).then((response) => {
        res.status(response.status).send(response.body);
    });

});

app.post('/purchase/platinum', (req, res) => {
    if (!req.body.purchaser){
        // purchaser should be, user, joe, or kard_store
        res.status(400).send({error: "Purchaser not specified"});
        return;
    }

    controller.purchasePlatinum(req.body.purchaser).then((response) => {
        res.status(response.status).send(response.body);
    });
});

app.get('/kards/:owner', (req, res) =>{
    if (!req.params.owner){
        // owner should be, user, joe, or kard_store
        // owner is the owner of the kards you are wanting
        res.status(400).send({error: "Owner not specified"});
        return;
    }

    controller.getOwnedKards(req.params.owner).then((response) => {
        res.status(response.status).send(response.body);
    });

});

app.post('/transfer', (req, res) => {
    if (!req.body.from || !req.body.from || !req.body.to || !req.body.kardId) {
        res.status(400).send({error: "Invalid request body"});
        return;
    }

    controller.transfer(req.body.from, req.body.to, req.body.kardId).then((response) => {
        res.status(response.status).send(response.body);
    })


});

app.listen(3000, () => {
   console.log('listening on port 3000');
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var controller = new (require('./controller.js'))();
controller.checkKeyFile();

app.use('/', express.static(__dirname + '/dist'));
app.use('/app', express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// POST call with apiKey in body and optional locale specified [eu, ap, ko] (Defaults to US)
app.post('/launch', (req, res) => {
    controller.startLaunch(req.body.apiKey, req.body.locale).then((response) => {
        res.status(response.status).send(response.body);
    });
});

app.get('/launch/status', (req, res) => {
    // TODO: make new controller function for getting status
    let response = controller.getLaunchStatus();
    res.status(response.status).send(response.body);
});

// POST call with packType in url and purchaser set in body
// Returns the tx receipt from the smart contract
app.post('/purchase/:packType', (req, res) => {

    if (!req.params.packType || !req.body.purchaser){
        // purchaser should be, user, joe, or kard_store
        res.status(400).send({error: "Pack Type or Purchaser not specified"});
        return;
    }

    controller.purchase(req.params.packType, req.body.purchaser).then((response) => {
        res.status(response.status).send(response.body);
    });
});

// GET call with owner in the url (user, joe)
// Returns a 'kards' object in the response body where the key is the
// kardId and it has values color, shape, and effect
app.get('/kards/:owner', (req, res) => {
    if (!req.params.owner){
        res.status(400).send({error: "Owner not specified"});
        return;
    }

    controller.getOwnedKards(req.params.owner).then((response) => {
        res.status(response.status).send(response.body);
    });
});

// POST call with from, to, and kardId specified in the body
// Returns the tx receipt from the smart contract
app.post('/transfer', (req, res) => {
    if (!req.body.from || !req.body.to || !req.body.kardId) {
        res.status(400).send({error: "Invalid request body"});
        return;
    }

    controller.transfer(req.body.from, req.body.to, req.body.kardId).then((response) => {
        res.status(response.status).send(response.body);
    });
});

// GET call with owner in the url
// Returns the balance of the user in ether (ETH)
app.get('/balance/:owner', (req, res) => {
    if (!req.params.owner){
        res.status(400).send({error: "Owner not specified"});
        return;
    }

    controller.getBalance(req.params.owner).then((response) => {
        res.status(response.status).send(response.body);
    });
});

app.get('/history/:kardId', (req, res) => {
    if (!req.params.kardId){
        res.status(400).send({error: "KardId not specified"});
        return;
    }

    controller.getKardHistory(req.params.kardId).then((response) => {
        res.status(response.status).send(response.body);
    });
});

app.listen(3000, () => {
   console.log('listening on port 3000');
});

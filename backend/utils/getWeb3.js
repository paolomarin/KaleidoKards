const Web3 = require('web3');
const fs = require("fs");

let user_node         = 'user_node';
let joe_node          = 'joe_node';
let kard_store_node   = 'kard_store_node';

function getCredentials(node) {

    // If no keystore file found, we can't connect to any node
    let filepath = __dirname + "/../../.data/keystore.json";
    if (!fs.existsSync(filepath)) {
        return;
    }

    let data = fs.readFileSync(filepath);

    let keyfile = JSON.parse(data);

    if (node === user_node)
        return keyfile.user_node;
    else if (node === joe_node)
        return keyfile.joe_node;
    else if (node === kard_store_node)
        return keyfile.kard_store_node;

}

function getWeb3(node) {
    return new Promise(function(resolve, reject) {

        let credentials = getCredentials(node);

        if (!credentials) {
            reject("Invalid keystore file!");
        }
        // URL format "https://<username>:<password>@xxxxxxxxxx-xxxxxxxxxx-rpc.us-east-2.kaleido.io"
        let url = 'https://' + credentials.username + ':' + credentials.password + '@'
            + credentials.urls.rpc.substring(8); // substring removes "https://"

        let provider = new Web3.providers.HttpProvider(url);
        let web3 = new Web3(provider);
        resolve(web3);
    });
}

module.exports = getWeb3;
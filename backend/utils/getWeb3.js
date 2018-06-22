const Web3 = require('web3');

//TODO: make the read from ../../.data/keystore.json file
let user_node         = 'https://u0hy7mtdq3:mD29RPL7yEpwZqnqKPHGHbkdMoOAbUMO2JnUGYwO2LI@u0p56k3t54-u0p9sxe7c1-rpc.us-east-2.kaleido.io';
let kard_store_node   = 'https://u0mxwuin6i:J0zxYgGsGibkQXhT0YEjo2cIlyVzOQrnXfxVX367rg8@u0p56k3t54-u0a26yrksx-rpc.us-east-2.kaleido.io';
let kal_node          = 'https://u0ai0eltfn:ODtMlsSvBQHT0DfsnCdukecwYYHNkKssChcGCNmQAGg@u0p56k3t54-u0d40lxuwu-rpc.us-east-2.kaleido.io';

function getWeb3(node) {
    return new Promise(function(resolve, reject) {

        var websocket;
        if (node === 'user_node')
            websocket = user_node;
        else if (node === 'kaleido_node')
            websocket = kal_node;
        else if (node === 'kard_store_node')
            websocket = kard_store_node;

        // var provider = new Web3.providers.WebsocketProvider(websocket);
        var provider = new Web3.providers.HttpProvider(websocket);
        let web3 = new Web3(provider);
        resolve(web3);

    })

}

module.exports = getWeb3;
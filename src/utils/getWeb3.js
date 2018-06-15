import Web3 from 'web3'

let user_node         = 'wss://u0hy7mtdq3:mD29RPL7yEpwZqnqKPHGHbkdMoOAbUMO2JnUGYwO2LI@u0p56k3t54-u0p9sxe7c1-wss.us-east-2.kaleido.io';
let kard_store_node   = 'wss://u0mxwuin6i:J0zxYgGsGibkQXhT0YEjo2cIlyVzOQrnXfxVX367rg8@u0p56k3t54-u0a26yrksx-wss.us-east-2.kaleido.io';
let kal_node          = '';

let getWeb3 = (node) => {
  new Promise(function(resolve, reject) {

      var websocket;
      if (node == 'user_node')
        websocket = user_node;
      else if (node == 'kaleido_node')
        websocket = kal_node;
      else if (node == 'kard_store_node')
        websocket = kard_store_node;

      window.addEventListener('load', function() {

          var provider = new Web3.providers.WebsocketProvider(websocket);
          web3 = new Web3(provider);

          let results = {
              web3: web3
          };

          resolve(results)
      })
    })
};

export default getWeb3

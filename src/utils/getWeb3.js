import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results

      // var provider = new Web3.providers.WebsocketProvider('wss://u0q2dz2rmh:fZFwLJpjzi7gVoATNmlQAoObaFBSbXTJzFjq8Q0gL9o@u0e1t1r8ll-u0gqc8s2lr-wss.us-east-2.kaleido.io')
      var provider = new Web3.providers.WebsocketProvider('wss://u0mxwuin6i:J0zxYgGsGibkQXhT0YEjo2cIlyVzOQrnXfxVX367rg8@u0p56k3t54-u0a26yrksx-wss.us-east-2.kaleido.io')

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    // }
  })
})

export default getWeb3

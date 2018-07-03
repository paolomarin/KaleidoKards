var Web3 = require('web3');

module.exports = {
    networks: {
        user_node: {
            provider: () => { //dmb node
                return new Web3.providers.HttpProvider('https://u0xl20cr72-u0hl24z86l-rpc.us-east-2.kaleido.io', 0, 'u0cq1t66vr', 'RWptaskQe3ACH4wJFCt0LWAwwpsNZmO0fBlovWy88Hk');
            },
            network_id: "*", // Match any network id
            gasPrice: 0,
            gas: 4500000
        },
        kaleido_node: {
            provider: () => {
                return new Web3.providers.HttpProvider('https://u0xl20cr72-u0yw1giijx-rpc.us-east-2.kaleido.io', 0, 'u0zl8duwoe', '_DfPWXGjO-eHCn7v1DfnNvxfqWXIxNFn7M1ARhTu63k');
        },
            network_id: "*", // Match any network id
            gasPrice: 0,
            gas: 4500000
        },
        kard_store_node: {
            provider: () => {
                return new Web3.providers.HttpProvider('https://u0p56k3t54-u0a26yrksx-rpc.us-east-2.kaleido.io', 0, 'u0mxwuin6i', 'J0zxYgGsGibkQXhT0YEjo2cIlyVzOQrnXfxVX367rg8');
            },
            network_id: "*", // Match any network id
            gasPrice: 0,
            gas: 4500000
        },
    }
};

//https://github.com/trufflesuite/truffle-contract#api
// contract.setProvider

//could we use this as functions??  asUser(), asKaleido(), asKardStore() where they set network and return instance??
// ex.  asUser().buyStandardPack()
const KaleidoKardsContract = require('../../contracts/KaleidoKards.json');
var getWeb3 = require('./getWeb3.js');

// Wrapper object for web3 to interact with smart contract
class KaleidoKards {
    constructor() {
        console.log("Constructing KaleidoKards object");
        this.USER  = getWeb3('user_node');
        this.JOE   = getWeb3('joe_node');
        this.STORE = getWeb3('kard_store_node');

        this.targetGasLimit = 4712388; // hardcoded from targetGasLimit set when creating chain
        // TODO: change these after development
        this.standardPackCost = '1'; // in ether
        this.platinumPackCost = '1'; // in ether
    }

    // Deploy the KaleidoKards Smart Contract
    deploy() {
        if (this.deployed && this.contractAddress) {
            this.UserContract = this.USER.then(web3 => {
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });
            this.JoeContract = this.JOE.then(web3 => {
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });
            this.StoreContract = this.STORE.then(web3 => {
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });

            return new Promise((resolve) => {resolve(this.contractAddress)});
        }

        // else deploy the contract
        return this.STORE.then((web3) => {
            let bytecode = KaleidoKardsContract.bytecode;
            let abi = KaleidoKardsContract.abi;

            let contract = new web3.eth.Contract(abi);

            return web3.eth.getAccounts().then((accounts) => {
                return contract.deploy({data: bytecode}).send({data: bytecode, from: accounts[0], gasPrice: 0, gas: 2000000})
                .then( (response) => {
                    this.contractAddress = response._address;

                    this.UserContract = this.USER.then(response => {
                        // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                        return new response.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
                    });
                    this.JoeContract = this.JOE.then(response => {
                        // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                        return new response.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
                    });
                    this.StoreContract = this.STORE.then(response => {
                        // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                        return new response.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
                    });
                    this.deployed = true;
                    return this.contractAddress;
                });
            })
        })

    }

    // Returns a promise containing the default address of the node passed in
    getAddress(node){
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getAccounts();
        }).then(accounts => {
            return accounts[0];
        });
    }

    // Calls the transfer function on the solidity contract
    // Returns a promise containing the tx receipt of the transfer
    transfer(fromNode, toNode, kardId){
        return this.getAddress(toNode).then((toAddress) => {
            return this.getAddress(fromNode).then((fromAddress) => {
                return this.getLastBlock(fromNode).then(lastBlock => {
                    let config = Promise.all(this.getConfig(fromNode));
                    return config.then( response => {
                        let web3 = response[0];
                        let contract = response[1];
                        // TODO: consider estimating gas for this tx instead of relying on the last block
                        // This relies on specifying the from address so that the node we're
                        // talking to can check that it owns the address and sign the tx
                        return contract.methods.transfer(toAddress, kardId).send({ from: fromAddress, gas: lastBlock.gasLimit });
                    });
                })
            })
        });
    }

    // Returns the latest block in the chain
    getLastBlock(node){
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];

            return web3.eth.getBlock("latest");
        });
    }

    // Returns an object of all the kards that the node owns, elements keyed by kardId
    // To use map, iterate over the elements in the object then kard.id, kard.color, kard.shape, kard.effect
    getOwnedKards(node) {
        return this.getAddress(node).then((address) => {
            let config = Promise.all(this.getConfig(node));
            return config.then( response => {
                let web3 = response[0];
                let contract = response[1];
                return contract.methods.getOwnedKards(address).call().then((kardIdArray) => {
                    // Build array of promises so we can wait on all of them to resolve
                    // We need to wait on all of the getKard calls to resolve
                    // so that we can build a useful array
                    let promiseArray = [];
                    kardIdArray.forEach((kardIdString) => {
                        let kardId = parseInt(kardIdString);
                        let promise = contract.methods.getKard(kardId).call();
                        promiseArray.push(promise);
                    });
                    let promises = Promise.all(promiseArray);

                    let myKards = {};
                    return promises.then((kards) => {
                        kards.forEach((kard, i) => {
                            kard.id = kardIdArray[i];
                            myKards[kardIdArray[i]] = kard;
                        });
                        return myKards;
                    });
                });
            });
        });

    }

    // Calls buyStandardPack function on solidity contract
    // Returns a tx receipt of the purchase
    buyStandardPack(node) {
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getAccounts().then(accounts => {
                return contract.methods.buyStandardPack().send({
                    from: accounts[0],
                    gas: this.targetGasLimit,
                    value: web3.utils.toWei(this.standardPackCost, 'ether')
                })
            })
        });
    }

    // Same as buyStandardPack
    buyPlatinumPack(node) {
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getAccounts().then(accounts => {
                return contract.methods.buyPlatinumPack().send({
                    from: accounts[0],
                    gas: this.targetGasLimit,
                    value: web3.utils.toWei(this.platinumPackCost, 'ether')
                })
            })
        });
    }

    // Returns the ether (ETH) balance of first address of the node passed in
    getBalance(node) {
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return this.getAddress(node).then((address) => {
                return web3.eth.getBalance(address).then((balanceWei) => {
                    return web3.utils.fromWei(balanceWei, 'ether');
                })
            })
        });
    }

    // Returns an array of promise objects for the specific web3 and contract instances
    getConfig(node){
        if (node === 'user_node') {
            return [this.USER, this.UserContract];
        } else if (node === 'joe_node'){
            return [this.JOE, this.JoeContract];
        } else if (node === 'kard_store_node'){
            return [this.STORE, this.StoreContract];
        } else {
            return new Promise((resolve, reject) => reject("Invalid user/node"));
        }
    }
}

module.exports = KaleidoKards;
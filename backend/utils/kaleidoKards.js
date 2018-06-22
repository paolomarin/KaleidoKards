const KaleidoKardsContract = require('../../build/contracts/KaleidoKards.json');
var getWeb3 = require('./getWeb3.js');

class KaleidoKards {
// 0x702E797378A6A3c672374E58b2cf30a5220c2Fe7
    constructor() {

        this.USER  = getWeb3('user_node');
        this.KAL   = getWeb3('kaleido_node');
        this.STORE = getWeb3('kard_store_node');
    }

    // Deploy the KaleidoKards Smart Contract
    deploy() {
        //
        if (this.deployed && this.contractAddress) {
            this.UserContract = this.USER.then(web3 => {
                // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });
            this.KalContract = this.KAL.then(web3 => {
                // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });
            this.StoreContract = this.STORE.then(web3 => {
                // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
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
                    this.KalContract = this.KAL.then(response => {
                        // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                        return new response.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
                    });
                    this.StoreContract = this.STORE.then(response => {
                        // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                        return new response.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
                    });
                    this.deployed = true;
                    return response;
                });
            })
        })

    }

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

    //node like 'user_node', to like address ex. 0xfqerg13498g283jf03kfh47
    transfer(fromNode, toNode, kardId){
        return this.getAddress(toNode).then((toAddress) => {
            return this.getAddress(fromNode).then((fromAddress) => {
                return this.getLastBlock(fromNode).then(lastBlock => {
                    let config = Promise.all(this.getConfig(fromNode));
                    return config.then( response => {
                        let web3 = response[0];
                        let contract = response[1];
                        return contract.methods.transfer(toAddress, kardId).send({ from: fromAddress, gas: lastBlock.gasLimit });
                    });
                })
            })
        });
    }

    getLastBlock(node){
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];

            return web3.eth.getBlock("latest");
        });
    }

    //returns a map of all the current user's kards
    // kardId => attribute
    // return usage ex. myKards[13].color, myKards[13].shape, etc
    getOwnedKards(node) {
        let myKards = new Map();
        let config = Promise.all(this.getConfig(node));
        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];

            return web3.eth.getAccounts().then(accounts => {
                return contract.methods.getOwnedKards(accounts[0]).call().then((response) => {
                    return new Promise((resolve, reject) => {
                        //for each kard returned, get the values of the kard attributes
                        response.forEach(function (kardIdString) {
                            let kardId = parseInt(kardIdString);
                            contract.methods.getKard(kardId).call().then(
                                (kard) => {
                                    // console.log(kard);
                                    myKards[kardId] = kard;
                                });
                        });
                        resolve(myKards);
                    })
                });
            })
        })
    }



    buyStandardPack(node) {
        let config = Promise.all(this.getConfig(node));

        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getBlock("latest").then( lastBlock => {
                return web3.eth.getAccounts().then(accounts => {
                    return contract.methods.buyStandardPack().send({
                        from: accounts[0],
                        gas: lastBlock.gasLimit,
                        value: web3.utils.toWei('1', 'ether')
                    })
                })
            })
        });
        //just return the promise so the caller can handle response/errors
    }

    buyPlatinumPack(node) {
        let config = Promise.all(this.getConfig(node));

        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getBlock("latest").then( lastBlock => {
                return web3.eth.getAccounts().then(accounts => {
                    return contract.methods.buyPlatinumPack().send({
                        from: accounts[0],
                        gas: lastBlock.gasLimit,
                        value: web3.utils.toWei('1', 'ether') //todo: fix this cost somewhere
                    })
                })
            })
        });
        //just return the promise so the caller can handle response/errors
    }

    getConfig(node){
        if (node === 'user_node') {
            return [this.USER, this.UserContract];
        } else if (node === 'kaleido_node'){
            return [this.KAL, this.KalContract];
        } else if (node === 'kard_store_node'){
            return [this.STORE, this.StoreContract];
        }
    }
}

module.exports = KaleidoKards;
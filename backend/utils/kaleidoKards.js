const KaleidoKardsContract = require('../../contracts/KaleidoKards.json');
var getWeb3 = require('./getWeb3.js');

class KaleidoKards {
// 0x702E797378A6A3c672374E58b2cf30a5220c2Fe7
    constructor() {

        this.USER  = getWeb3('user_node');
        this.JOE   = getWeb3('joe_node');
        this.STORE = getWeb3('kard_store_node');
    }

    // Deploy the KaleidoKards Smart Contract
    deploy() {
        console.log("inside deploy");
        if (this.deployed && this.contractAddress) {
            this.UserContract = this.USER.then(web3 => {
                // return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                return new web3.eth.Contract(KaleidoKardsContract.abi, this.contractAddress);
            });
            this.JoeContract = this.JOE.then(web3 => {
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
            console.log("Inside this.store");
            let bytecode = KaleidoKardsContract.bytecode;
            let abi = KaleidoKardsContract.abi;

            let contract = new web3.eth.Contract(abi);

            return web3.eth.getAccounts().then((accounts) => {
                return contract.deploy({data: bytecode}).send({data: bytecode, from: accounts[0], gasPrice: 0, gas: 2000000})
                .then( (response) => {
                    console.log("after contract deploy");
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
        return this.getAddress(node).then((address) => {
            let config = Promise.all(this.getConfig(node));
            console.log("After get config");
            return config.then( response => {
                console.log("in get config");
                let web3 = response[0];
                let contract = response[1];
                return contract.methods.getOwnedKards(address).call().then((kardArray) => {
                    console.log("getOwned KArds: " + kardArray);
                    // Build array of promises so we can wait on all of them to resolve
                    let promiseArray = [];
                    kardArray.forEach((kardIdString) => {
                        let kardId = parseInt(kardIdString);
                        let promise = contract.methods.getKard(kardId).call();
                        promiseArray.push(promise);
                    });
                    let promises = Promise.all(promiseArray);

                    let myKards = {};
                    return promises.then((kards) => {
                        kards.forEach((kard, i) => {
                            myKards[kardArray[i]] = kard;
                        });
                        return myKards;
                    });
                });
            });
        });

    }

    buyStandardPack(node) {
        let config = Promise.all(this.getConfig(node));

        return config.then( response => {
            let web3 = response[0];
            let contract = response[1];
            return web3.eth.getBlock("latest").then( lastBlock => {
                // console.log("After get last block");
                // console.log("lastBlock: "+lastBlock);
                return web3.eth.getAccounts().then(accounts => {
                    // console.log("accounts: " + accounts);
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
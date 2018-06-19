import KaleidoKardsContract from '../../build/contracts/KaleidoKards.json';
import getWeb3 from './getWeb3.js';

// let web3;
// let kaleidoKardsInstance;
//
// let USER    = 'user_node';
// let KAL     = 'kaleido_node'; //todo: consider renaming this globally to kal_node
// let STORE   = 'kard_store_node';

// By default set the current node to the User
// let current_node = USER;

class KaleidoKards {
// 0x702E797378A6A3c672374E58b2cf30a5220c2Fe7
    constructor() {
        this.USER  = getWeb3('user_node');
        this.UserContract = this.USER.then(response => {
            return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
        });
        this.KAL   = getWeb3('kaleido_node');
        this.KalContract = this.KAL.then(response => {
            return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
        });
        this.STORE = getWeb3('kard_store_node');
        this.StoreContract = this.STORE.then(response => {
            return new response.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
        });
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
        }).then(function (txReceipt) {
            // console.log(txReceipt); //TODO: use this to get tx data for frontend
            return txReceipt;
        }).catch((err) => {
            console.log("buyStandardPack failed");
            console.log(err);
            return false;
            //todo: handle error
        });
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
        }).then(function (txReceipt) {
            console.log(txReceipt); //TODO: use this to get tx data for frontend
            return true;
        }).catch((err) => {
            console.log("buyStandardPack failed");
            console.log(err);
            return false;
            //todo: handle error
        });
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
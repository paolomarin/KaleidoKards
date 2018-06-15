import KaleidoKardsContract from '../build/contracts/KaleidoKards.json';
import getWeb3 from './utils/getWeb3';

let web3;
let kaleidoKardsInstance;

let USER    = 'user_node';
let KAL     = 'kaleido_node'; //todo: consider renaming this globally to kal_node
let STORE   = 'kard_store_node';

class KaleidoKards {

    constructor() {
        KaleidoKards.instantiateContract();
    }

    //TODO: need to switch user/node based on instance of web3
    // consider passing param to getWeb3 to  switch users

    // Functions for switching the node we're talking to
    // returns this to allow chaining calls to this contract
    // ex. asUser().getOwnedKards()
    static asUser(){
        this.updateNetwork(USER);
        return this;
    }

    static asKardStore(){
        this.updateNetwork(STORE);
        return this;
    }

    static asKaleido(){
        this.updateNetwork(KAL);
        return this;
    }

    static updateNetwork(provider) {

        getWeb3(provider)
            .then(results => {
                this.web3 = results.web3;
                //TODO: get contract address dynamically
                const kaleidoKards = new web3.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
                this.kaleidoKardsInstance = kaleidoKards;
            })
            .catch((err) => {
                console.log(err)
            })


    }

//returns a map of all the current user's kards
// kardId => attribute
// return usage ex. myKards[13].color, myKards[13].shape, etc
    static getOwnedKards() {
        let ret = new Promise(function (resolve, reject) {
            var myKards = new Map();
            this.kaleidoKardsInstance.methods.getOwnedKards("0x33F1ba1fa5F83Bc031E54bbBFBd2fF394707864C").call().then(
                (response) => {
                    //for each kard returned, get the values of the kard attributes
                    response.forEach(function (kardIdString) {
                        let kardId = parseInt(kardIdString);

                        this.kaleidoKardsInstance.methods.getKard(kardId).call().then(
                            (response) => {
                                myKards[kardId] = response;
                            })
                            .catch(
                                (error) => {
                                    console.log(error);
                                    reject(error);
                                    //todo handle error
                                }
                            );
                    });
                })
                .catch(
                    (error) => {
                        console.log("getOwnedKards failed");
                        console.log(error);
                        reject(error);
                        //todo handle error
                    });
            resolve(myKards);
        })
    }

    static buyStandardPack() {
        let ret = new Promise(function (resolve, reject) {

            this.kaleidoKardsInstance.methods.buyStandardPack().send({
                from: "0x33F1ba1fa5F83Bc031E54bbBFBd2fF394707864C",
                gas: 300000000,
                value: web3.utils.toWei('1', 'ether')
            }).then(function (receipt) {
                console.log(receipt);
                return true;
            })
                .catch((err) => {
                    console.log(err);
                    return false;
                    //todo: handle error
                });
        })
    }
}

module.exports = KaleidoKards;
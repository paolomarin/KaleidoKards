const fs = require('fs');
var KaleidoKards = require('./utils/kaleidoKards.js');
var KaleidoConfig = require('./utils/kaleidoConfig.js');

// A class for controlling the state of the application
class Controller {

    constructor() {
        this.kaleidoKardsInstance = {};
        this.kaleidoConfigInstance = new KaleidoConfig();
        this.previousInstance = false;
        this.contractAddress = '';
    }

    // Checks for a keyfile from a previous instance
    // The keyfile is so that we don't have to create a new environment everytime you use the app
    checkKeyFile() {
        let dir = __dirname + "/../.data";
        let filepath = dir + "/keystore.json";
        if (!fs.existsSync(filepath)) {
            this.previousInstance = false;
            return;
        }

        // A keystore file exists, lets see if it contains everything we need
        try {
            let data = fs.readFileSync(filepath);
            let keyfile = JSON.parse(data);
            // Address of the previous contract deployed to the
            this.contractAddress = keyfile.contractAddress;

            this.kaleidoConfigInstance.userNodeUser = keyfile.user_node.username;
            this.kaleidoConfigInstance.userNodePass = keyfile.user_node.password;
            this.kaleidoConfigInstance.userNodeUrls = keyfile.user_node.urls;

            this.kaleidoConfigInstance.joeNodeUser = keyfile.joe_node.username;
            this.kaleidoConfigInstance.joeNodePass = keyfile.joe_node.password;
            this.kaleidoConfigInstance.joeNodeUrls = keyfile.joe_node.urls;

            this.kaleidoConfigInstance.storeNodeUser = keyfile.kard_store_node.username;
            this.kaleidoConfigInstance.storeNodePass = keyfile.kard_store_node.password;
            this.kaleidoConfigInstance.storeNodeUrls = keyfile.kard_store_node.urls;

            this.previousInstance = true;
        } catch(error) {
            console.log(error);
            this.previousInstance = false;
        }
    }

    // Launches a new Kaleido platform if there is no record of one previously
    // Returns response object to send to frontend
    async launchAppEnv(apiKey) {
        let response = {status: 400, body: {}};

        if (this.kaleidoKardsInstance && this.kaleidoKardsInstance.deployed) {
            response.status = 200;
            response.body.contractAddress = this.kaleidoKardsInstance.contractAddress;
            return response;
        }

        if (this.previousInstance) {
            this.kaleidoKardsInstance = new KaleidoKards();
            this.kaleidoKardsInstance.contractAddress = this.contractAddress;
            this.kaleidoKardsInstance.deployed = true;
            return await this.kaleidoKardsInstance.deploy().then((contractAddress) => {
                response.status = 200;
                response.body.contractAddress = contractAddress;
                return response;
            });
        }

        apiKey = apiKey.trim();
        if (!apiKey && !this.previousInstance) {
            //TODO: this shouldnt be 500
            response.status = 400;
            response.body.error = "No Api Key in body";
            return response;
        }

        // No record of previous instacne, let's make a new one
        return await this.kaleidoConfigInstance.launch(apiKey).then(() => {
            this.kaleidoKardsInstance = new KaleidoKards();
            return this.kaleidoKardsInstance.deploy().then(() => {
                this.kaleidoConfigInstance.contractAddress = this.kaleidoKardsInstance.contractAddress;
                this.contractAddress = this.kaleidoConfigInstance.contractAddress;
                this.kaleidoConfigInstance.writeKeyFile();

                response.status = 200;
                response.body.contractAddress = this.kaleidoKardsInstance.contractAddress;
                return response;
            }).catch((error) => {
                console.log("Here's an error ", error);

                response.status = 500;
                response.body.error = JSON.stringify(error);
                return response;
            });
        }).catch((error) => {
            response.status = 500;
            console.log("Here's an error from launching the env: ", error);

            if (error.statusCode === 401) {
                response.status = error.statusCode;
                error = error.error;
            } else if (error.statusCode) {
                // if the error contains a status code than this is an error
                // from the kaleido api, otherwise its an internal server error
                response.status = error.statusCode;
                error = JSON.parse(error.error).errorMessage;
            }

            response.body.error = error;
            return response;
        });
    }

    // Handle's calling the right functions in the contract wrapper to
    // buy a pack of kards
    purchase(packType, purchaser) {
        let response = {status: 400, body: {}};

        if (packType === 'standard') {
            return new Promise(resolve => {
                this.kaleidoKardsInstance.buyStandardPack(purchaser + '_node').then((receipt) => {
                    response.status = 200;
                    response.body.receipt = receipt;
                    resolve(response);
                }).catch((error) => {
                    response.status = 500;
                    response.body.error = error;
                    resolve(response);
                });
            })
        } else if (packType === 'platinum') {
            return new Promise(resolve => {
                this.kaleidoKardsInstance.buyPlatinumPack(purchaser + '_node').then((receipt) => {
                    response.status = 200;
                    response.body.receipt = receipt;
                    resolve(response);
                }).catch((error) => {
                    response.status = 500;
                    response.body.error = error;
                    resolve(response);
                });
            })
        } else {
            return new Promise(resolve => {
                response.body.error = "Bad Request";
                resolve(response)
            });
        }
    }

    // Returns a json object of kards
    getOwnedKards(owner){
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.getOwnedKards(owner + '_node').then((kards) => {
                response.status = 200;
                response.body.kards = kards;
                resolve(response);
            }).catch((error) => {
                response.status = 500;
                response.body.error = error;
                resolve(response);
            });
        })
    }

    // Transfers a kard from one user to another
    transfer(from, to, kardId) {
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.transfer(from + '_node', to + '_node', kardId).then((receipt) => {
                response.status = 200;
                response.body.receipt = receipt;
                resolve(response);
            }).catch((error) => {
                // There's a chance that this returns an "Out of gas" error
                // Not due to actually running out of gas but because a require()
                // function on the contract returns an error.
                // Usually meaning that the sender does not own the kard they
                // are trying to transfer.
                console.log(error);
                response.status = 500;
                response.body.error = JSON.stringify(error);
                resolve(response);
            });
        })
    }

    // Returns the ETH balance of a user
    getBalance(owner) {
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.getBalance(owner + '_node').then((balance) => {
                response.status = 200;
                response.body.balance = balance;
                resolve(response);
            }).catch((error) => {
                response.status = 500;
                response.body.error = error;
                resolve(response);
            });
        })
    }

}

module.exports = Controller;

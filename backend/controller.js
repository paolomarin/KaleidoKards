const fs = require('fs');
var KaleidoKards = require('./utils/kaleidoKards.js');
var KaleidoConfig = require('./utils/KaleidoConfig.js');



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

        try {
            let data = fs.readFileSync(filepath);
            let keyfile = JSON.parse(data);

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

    async launchAppEnv(apiKey) {
        let response = {status: 400, body: {}};

        if (this.kaleidoKardsInstance && this.kaleidoKardsInstance.deployed) {
            response.status = 200;
            response.body.contractAddress = this.kaleidoKardsInstance.contractAddress;
            return response;
        }

        // var kaleidoKardConfig = new KaleidoConfig(apiKey);
        console.log(this.previousInstance);
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
            response.status = 500;
            response.body.error = "No Api Key in body";
            return response;
        }

        // Previous instance doesn't exist
        // console.log("No previous instance found!");
        // console.log("***Creating new kaleidoConfig now");
        return await this.kaleidoConfigInstance.launch(apiKey).then(() => {
            // console.log("kaleidoconfig.then");
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
                response.body.error = error;
                return response;
            });
        }).catch((error) => {
            console.log("Here's an error from launching the env ", error);

            response.status = 500;
            response.body.error = error;
            return response;
        });
    }

    purchaseStandard(purchaser) {
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.buyStandardPack(purchaser + '_node').then((reciept) => {
                response.status = 200;
                response.body.reciept = reciept;
                resolve(response);
            }).catch((error) => {
                console.log(error);
                response.status = 500;
                response.body.error = error;
                resolve(response);
            });
        })
    }

    purchasePlatinum(purchaser) {
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.buyPlatinumPack(purchaser + '_node').then((reciept) => {
                response.status = 200;
                response.body.receipt = reciept;
                resolve(response);
            }).catch((error) => {
                response.status = 500;
                response.body.error = error;
                resolve(response);
            });
        })
    }

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

    transfer(from, to, kardId) {
        let response = {status: 400, body: {}};
        return new Promise(resolve => {
            this.kaleidoKardsInstance.transfer(from + '_node', to + '_node', kardId).then((receipt) => {
                response.status = 200;
                response.body.receipt = receipt;
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
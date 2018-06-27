const request = require("request-promise");
const fs = require("fs");

class KaleidoConfig {

    constructor() {
        //TODO: check for previous config file?
        //TODO: determine locale?? console-eu/ap

        this.consortiumName = "KaleidoKards-SampleApp";
        this.consortiumDescription = "Sample application for Blockchain 101";

        this.environmentName = "KaleidoKards Environment";
        this.environmentProvider = "geth";
        this.environmentConsensusType = "poa";

        this.ethAmount = "100";

        this.memberUser = "user";
        this.memberKal = "joe";
        this.memberStore = "kard_store";

        this.nodeUser = "user_node";
        this.nodeKal = "joe_node";
        this.nodeStore = "kard_store_node";

        this.contractAddress = "";

        this.previousInstance = false;

        // this.checkKeyFile();
        //
        // if (this.previousInstance) {
        //     return;
        // }

        this.userNodeUrls = {};
        this.userNodeUser = "";
        this.userNodePass ="";

        this.joeNodeUrls = {};
        this.joeNodeUser = "";
        this.joeNodePass = "";

        this.storeNodeUrls = {};
        this.storeNodeUser = "";
        this.storeNodePass = "";
    }

    // Closely follows https://console.kaleido.io/docs/docs/api101/
    launch(apiKey) {

        this.baseUrl = "https://console.kaleido.io/api/v1";
        this.headers = {"Authorization":"Bearer " + apiKey, "Content-Type":"application/json"};
        // TODO: check api key length, maybe trim it
        // TODO add comments on logging
        return this.createConsortia().then((response) => {
            // console.log(response);
            let jsonResponse = JSON.parse(response);
            // console.log(jsonResponse);
            let consortium = jsonResponse._id;
            // console.log(consortium);
            return this.createEnvironment(consortium).then((response) => {
                // console.log(response);
                let jsonResponse = JSON.parse(response);
                // console.log(jsonResponse);
                let environment = jsonResponse._id;
                // Create the 3 memberships at once
                return Promise.all([
                    this.createMembership(consortium, this.memberUser),
                    this.createMembership(consortium, this.memberKal),
                    this.createMembership(consortium, this.memberStore)])
                    .then((response) => {
                        // Promise.all returns the responses for each call in an array
                        // console.log(response);
                        let userResponse  = JSON.parse(response[0]);
                        let joeResponse   = JSON.parse(response[1]);
                        let storeResponse = JSON.parse(response[2]);

                        let userMember = userResponse._id;
                        let joeMember = joeResponse._id;
                        let storeMember = storeResponse._id;
                        // Create the 3 nodes at once
                        return Promise.all([
                            this.createNode(consortium, environment, userMember, this.nodeUser),
                            this.createNode(consortium, environment, joeMember, this.nodeKal),
                            this.createNode(consortium, environment, storeMember, this.nodeStore)])
                            .then((response) => {
                                let userResponse  = JSON.parse(response[0]);
                                let joeResponse   = JSON.parse(response[1]);
                                let storeResponse = JSON.parse(response[2]);

                                //Wait on all the nodes to be initialized then get their status
                                return Promise.all([
                                    this.waitForNodeInitialization(consortium, environment, userResponse._id),
                                    this.waitForNodeInitialization(consortium, environment, joeResponse._id),
                                    this.waitForNodeInitialization(consortium, environment, storeResponse._id)])
                                    .then((response) => {
                                        let userNodeStatus  = response[0];
                                        let joeNodeStatus   = response[1];
                                        let storeNodeStatus = response[2];

                                        // Get the urls to communicate with the nodes
                                        this.userNodeUrls  = userNodeStatus.urls;
                                        this.joeNodeUrls   = joeNodeStatus.urls;
                                        this.storeNodeUrls = storeNodeStatus.urls;


                                        return Promise.all([
                                            this.generateAppCredentials(consortium, environment, userMember),
                                            this.generateAppCredentials(consortium, environment, joeMember),
                                            this.generateAppCredentials(consortium, environment, storeMember)])
                                            .then((response) => {
                                                let userNodeStatus  = JSON.parse(response[0]);
                                                let joeNodeStatus   = JSON.parse(response[1]);
                                                let storeNodeStatus = JSON.parse(response[2]);

                                                this.userNodeUser = userNodeStatus.username;
                                                this.userNodePass = userNodeStatus.password;

                                                this.joeNodeUser = joeNodeStatus.username;
                                                this.joeNodePass = joeNodeStatus.password;

                                                this.storeNodeUser = storeNodeStatus.username;
                                                this.storeNodePass = storeNodeStatus.password;

                                                return Promise.all([
                                                    this.getNodeStatus(consortium, environment, userResponse._id),
                                                    this.getNodeStatus(consortium, environment, joeResponse._id)
                                                ]).then((response) => {
                                                    userNodeStatus = JSON.parse(response[0]);
                                                    joeNodeStatus = JSON.parse(response[1]);

                                                    let userAddress = userNodeStatus.user_accounts[0];
                                                    let joeAddress = joeNodeStatus.user_accounts[0];
                                                    // storeAddress = storeNodeStatus.user_accounts[0];
                                                    return Promise.all([
                                                        this.fundAccount(consortium, environment, userAddress),
                                                        this.fundAccount(consortium, environment, joeAddress)])
                                                        .then((receipts) => {
                                                            // receipts is the transaction receipts from funding the accounts
                                                            this.writeKeyFile();
                                                            return this;
                                                            // Finally, we have everything created and all the creds we need to make some magic
                                                            // So lets write them to a file for later use
                                                            // this.writeKeyFile();
                                                        })
                                                });
                                            });
                                    });
                            });
                    });
            });
        });
    }

    createConsortia() {
        //create a new business consortium
        let body = JSON.stringify({name: this.consortiumName, description: this.consortiumDescription});
        let uri = this.baseUrl + "/consortia";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    createEnvironment(consortium){

        let body = JSON.stringify({name: this.environmentName, provider: this.environmentProvider, consensus_type: this.environmentConsensusType});
        let uri = this.baseUrl + "/consortia/" + consortium + "/environments";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    createMembership(consortium, orgName){
        let body = JSON.stringify({org_name: orgName});
        let uri = this.baseUrl + /consortia/ + consortium + "/memberships";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    createNode(consortium, environment, membershipId, name) {
        let body = JSON.stringify({membership_id: membershipId, name: name});
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/nodes";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    async waitForNodeInitialization(consortium, environment, node) {
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/nodes/" + node;
        let options = {method: 'GET', uri: uri, headers: this.headers};
        let state = "initializing";
        let jsonResponse;
        while (state === "initializing") {
            let response = await request(options);
            jsonResponse = JSON.parse(response);
            state = jsonResponse.state;
            // Wait 3 seconds so we don't spam the API
            console.log("Waiting on Node initialization: " + node);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        return jsonResponse;
    }

    getNodeStatus(consortium, environment, node) {
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/nodes/" + node + "/status";
        let options = {method: 'GET', uri: uri, headers: this.headers};
        return request(options);
    }

    generateAppCredentials(consortium, environment, membershipId){
        let body = JSON.stringify({membership_id: membershipId});
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/appcreds";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    fundAccount(consortium, environment, address) {
        let body = JSON.stringify({account: address, amount: this.ethAmount});
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/eth/fundaccount";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    writeKeyFile() {
        const fs = require("fs");
        //build keys object
        console.log("Config address: " + this.contractAddress);
        let keys = {
            contractAddress: this.contractAddress,
            user_node: {urls: this.userNodeUrls, username: this.userNodeUser, password: this.userNodePass},
            joe_node: {urls: this.joeNodeUrls, username: this.joeNodeUser, password: this.joeNodePass},
            kard_store_node: {urls: this.storeNodeUrls, username: this.storeNodeUser, password: this.storeNodePass}
        };

        let data = JSON.stringify(keys);
        // If the directory doesn't exist, lets create it
        let dir = __dirname + "/../../.data";
        !fs.existsSync(dir) && fs.mkdirSync(dir);

        let filepath = dir + "/keystore.json";
        fs.writeFileSync(filepath, data);
        this.previousInstance = true;
    }


    checkKeyFile() {
        let filepath = __dirname + "\\..\\..\\.data\\keystore.json";
        if (!fs.existsSync(filepath)) {
            this.previousInstance = false;
            return;
        }
        this.previousInstance = true;

        fs.readFile(filepath, "utf8", (err, data) => {
            if (err) return;
            let keyfile = JSON.parse(data);

            this.contractAddress = keyfile.contractAddress;

            this.userNodeUser = keyfile.user_node.username;
            this.userNodePass = keyfile.user_node.password;
            this.userNodeUrls = keyfile.user_node.urls;

            this.joeNodeUser = keyfile.joe_node.username;
            this.joeNodePass = keyfile.joe_node.password;
            this.joeNodeUrls = keyfile.joe_node.urls;

            this.storeNodeUser = keyfile.kard_store_node.username;
            this.storeNodePass = keyfile.kard_store_node.password;
            this.storeNodeUrls = keyfile.kard_store_node.urls;

        });
    }
}

module.exports = KaleidoConfig;

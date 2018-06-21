const request = require("request-promise");


class KaleidoConfig {

    constructor(apiKey) {
        //TODO: check for previous config file?
        //TODO: determine locale?? console-eu/ap
        this.baseUrl = "https://console.kaleido.io/api/v1";
        this.headers = {"Authorization":"Bearer " + apiKey, "Content-Type":"application/json"};

        this.consortiumName = "KaleidoKards-SampleApp";
        this.consortiumDescription = "Sample application for Blockchain 101";

        this.environmentName = "KaleidoKards Environment";
        this.environmentProvider = "geth";
        this.environmentConsensusType = "poa";

        this.memberUser = "user";
        this.memberKal = "kal";
        this.memberStore = "kard_store";

        this.nodeUser = "user_node";
        this.nodeKal = "kal_node";
        this.nodeStore = "kard_store_node";

        this.userNodeUrls = {};
        this.userNodeUser = "";
        this.userNodePass ="";

        this.kalNodeUrls = {};
        this.kalNodeUser = "";
        this.kalNodePass = "";

        this.storeNodeUrls = {};
        this.storeNodeUser = "";
        this.storeNodePass = "";
    }

    // Closely follows https://console.kaleido.io/docs/docs/api101/
    launch() {
        // TODO: check api key length, maybe trim it
        // TODO add comments on logging
        return this.createConsortia().then((response) => {
            console.log(response);
            let jsonResponse = JSON.parse(response);
            console.log(jsonResponse);
            let consortium = jsonResponse._id;
            console.log(consortium);
            return this.createEnvironment(consortium).then((response) => {
                console.log(response);
                let jsonResponse = JSON.parse(response);
                console.log(jsonResponse);
                let environment = jsonResponse._id;
                // Create the 3 memberships at once
                return Promise.all([
                    this.createMembership(consortium, this.memberUser),
                    this.createMembership(consortium, this.memberKal),
                    this.createMembership(consortium, this.memberStore)])
                    .then((response) => {
                        // Promise.all returns the responses for each call in an array
                        console.log(response);
                        let userResponse  = JSON.parse(response[0]);
                        let kalResponse   = JSON.parse(response[1]);
                        let storeResponse = JSON.parse(response[2]);

                        let userMember = userResponse._id;
                        let kalMember = kalResponse._id;
                        let storeMember = storeResponse._id;
                        // Create the 3 nodes at once
                        return Promise.all([
                            this.createNode(consortium, environment, userMember, this.nodeUser),
                            this.createNode(consortium, environment, kalMember, this.nodeKal),
                            this.createNode(consortium, environment, storeMember, this.nodeStore)])
                            .then((response) => {
                                let userResponse  = JSON.parse(response[0]);
                                let kalResponse   = JSON.parse(response[1]);
                                let storeResponse = JSON.parse(response[2]);

                                //Wait on all the nodes to be initialized then get their status
                                return Promise.all([
                                    this.waitForNodeInitialization(consortium, environment, userResponse._id),
                                    this.waitForNodeInitialization(consortium, environment, kalResponse._id),
                                    this.waitForNodeInitialization(consortium, environment, storeResponse._id)])
                                    .then((response) => {
                                        let userNodeStatus  = response[0];
                                        let kalNodeStatus   = response[1];
                                        let storeNodeStatus = response[2];

                                        // Get the urls to communicate with the nodes
                                        this.userNodeUrls  = userNodeStatus.urls;
                                        this.kalNodeUrls   = kalNodeStatus.urls;
                                        this.storeNodeUrls = storeNodeStatus.urls;

                                        return Promise.all([
                                            this.generateAppCredentials(consortium, environment, userMember),
                                            this.generateAppCredentials(consortium, environment, kalMember),
                                            this.generateAppCredentials(consortium, environment, storeMember)])
                                            .then((response) => {
                                                let userNodeStatus  = JSON.parse(response[0]);
                                                let kalNodeStatus   = JSON.parse(response[1]);
                                                let storeNodeStatus = JSON.parse(response[2]);

                                                this.userNodeUser = userNodeStatus.username;
                                                this.userNodePass = userNodeStatus.password;

                                                this.kalNodeUser = kalNodeStatus.username;
                                                this.kalNodePass = kalNodeStatus.password;

                                                this.storeNodeUser = storeNodeStatus.username;
                                                this.storeNodePass = storeNodeStatus.password;

                                                this.writeKeyFile();
                                                return this;
                                                // Finally, we have everything created and all the creds we need to make some magic
                                                // So lets write them to a file for later use
                                                // this.writeKeyFile();
                                            });
                                    });
                            });
                    });
            });
        }).catch((error) => {
            console.log("CAUGHT ERROR");
            console.log(error);
            console.log("ERROR.ERROR");
            console.log(error.error);
            return error.error;
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
            console.log("Waiting on Node initialization");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        return jsonResponse;
    }

    generateAppCredentials(consortium, environment, membershipId){
        let body = JSON.stringify({membership_id: membershipId});
        let uri = this.baseUrl + /consortia/ + consortium + "/environments/" + environment + "/appcreds";
        let options = {method: 'POST', uri: uri, headers: this.headers, body: body};
        return request(options);
    }

    writeKeyFile() {
        const fs = require("fs");
        //build keys object
        let keys = {
            user_node: {urls: this.userNodeUrls ,username: this.userNodeUser, password: this.userNodePass},
            kal_node: {urls: this.kalNodeUrls, username: this.kalNodeUser, password: this.kalNodePass},
            kard_store_node: {urls: this.storeNodeUrls, username: this.storeNodeUser, password: this.storeNodePass}
        };

        let data = JSON.stringify(keys);
        // If the directory doesn't exist, lets create it
        let dir = "./.data";
        !fs.existsSync(dir) && fs.mkdirSync(dir);

        let filepath = dir + "/keystore.json";
        fs.writeFileSync(filepath, data);
    }


}

module.exports = KaleidoConfig;

// let kaleidoConfig = new KaleidoConfig("u0p4z975ac-tma/KhHqlxsyVKknanaBqfuNp7ZQupT6MjfAcPm4zBk=");
// kaleidoConfig.launch().then((response) => {
//     console.log("\n\n\n");
//     console.log("*****RESPONSE*****");
//     console.log(response, "response");
//     console.log(response.userNodeUrls);
//     console.log(response.userNodeUser, "User");
//     console.log(response.userNodePass, "Pass");
// });
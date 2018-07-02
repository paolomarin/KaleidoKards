## What is it? 

KaleidoKards is a lightweight application using React for frontend browser interaction and the Web3 JavaScript library to format and send the blockchain-specific JSON RPC calls to the backend network.  This project aims to serve as a template for developers seeking to craft their first decentralized application against an Ethereum network.  The server side node code and the solidity smart contract contain extensive comments in an effort to add clarity to the various APIs and methods.  

## Usage 

The application runs on [Glitch](https://glitch.com/about/), a platform providing a free and secure deployment pipeline that also contains an interactive code editor for rapid development and ideation.  Each application instance is provisioned a unique URL, with key files and data stores isolated to that namespace.  

Prior to launching the application, you must visit the [Kaleido console](https://console.kaleido.io) and acquire an administrative API Key.  The application is configured to automatically provision Kaleido network resources (e.g. environment, nodes, security credentials, etc.) and requires this key in order to authenticate with the backend servers and confine the resources to your Kaleido account.  Note that the Kaleido resource limitations imposes a two consortia per Kaleido Org threshold.  As a result, if your organization is already hosting two consortia, then the application will be unable to successfully provision the network resources.  Ensure that you have one or fewer consortia prior to launching the app.

With your API Key in hand, proceed to build the project by clicking this button - [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/kaleidokards).  
* This will provision you your own unique instance of the application, which you can edit and tinker with as you please.
* Within the Glitch console, you can click the **Logs** tab on the far left of the screen to see the progress of the build.  The entire process should take roughly one minute.
* Once the build has finished, you will see an output in the logs stating `listening on port 3000`
* You will also see a green **Live** indicator at the top left of the screen 
* Click the **Show App** option next to **Live** to start up the app 
* In the new window, paste your API Key and click the **Launch** button 
* The trading portion of the application will appear once the internal resource creation calls complete; roughly one minute.
* From within the trading console, you can elect to purchase either `standard` or `platinum` cards.  This act of purchasing will invoke a function in the solidity smart contract running on the blockchain and update the ledger for our three participants - Card Vendor, Joe and yourself.
* You also have the option to propose trades with your counterparty, Joe.  If the trade is accepted, a transfer function will be invoked on the smart contract and the cards will be updated on the ledger to reflect new ownership.  

## Data and Resources 

The blockchain specific resources (consortia, environment, nodes, credentials and smart contract) are all confined to your specific Kaleido account.  You can view them by logging into the [Kaleido console](https://console.kaleido.io) and following the `KaleidoKards-SampleApp Consortium` to the `KaleidoKards Environment`.  

The application itself requires a subset of these resources in order to successfully communicate with the blockchain layer.  In particular, the application ingests your Kaleido API Key for the resource creation calls and then uses the fully qualified RPC endpoints for each node along with the deployed smart contract address to exercise the Web3.js `call` and `send` methods.  The artifacts are stored as a `keystore.json` within a hidden `.data` directory at the root of the project.  To view the file, simply click the **Logs** tab at the top left of the screen and select the **Console** option on the bottom left of the window.  The console opens up a standard command line interface that you can navigate through in a similar fashion to your local terminal.   

## Contributing 

We gladly welcome pull requests. To get started, just fork this repo, clone it locally and submit your PR.  In the body of the pull request please include a link to the working version of your Glitch environment.  That way we can test on our end and confirm the expected behavior.  Note that you **DO NOT** need to utilize the `share` feature within the Glitch IDE.  If you do elect to share your namespace, then you are granting access to your secret credentials and node endpoints to the invited individuals.  The Kaleido team neither wants nor needs this information.  We simply want a link to your working library of code.

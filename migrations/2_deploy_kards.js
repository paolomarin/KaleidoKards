var KaleidoKards = artifacts.require("KaleidoKards");

module.exports = function(deployer) {
    // Pass 123 to the contract as the first constructor parameter
    deployer.deploy(KaleidoKards)
};
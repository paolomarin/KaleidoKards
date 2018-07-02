pragma solidity ^0.4.19;


contract KaleidoKards {


    /*** Constants ***/
    
    //Number of Kards
    uint8 constant public standardKardAmount = 25;
    uint8 constant public platinumKardAmount = 100;

    // Max values of Kard attributes 0-4
    uint8 constant public maxColor  = 4;
    uint8 constant public maxShape  = 4;
    uint8 constant public maxEffect = 4;

    // TODO: change this after development
    // Prices for buying a pack of Kards from the contract
    uint256 constant public standardPackPrice = 1 ether;
    uint256 constant public platinumPackPrice = 1 ether;

    // Number of Kards in a pack
    uint8 constant public packSize = 3;


    /*** Ownership ***/

    // Keeping track of how many Kards are issued so far
    uint8 public issuedStandardKards = 0;
    uint8 public issuedPlatinumKards = 0;

    // Address of the contract/store owner selling Kards
    address public contractOwner;

    // Mapping from KardId to the Kard Owner's address
    mapping(uint256 => address) public kardOwner;

    // Mapping of address to array of owned Kards
    mapping(address => uint256[]) internal ownedKards;

    
    /**
     * Constructor function
     *
     */
    constructor() public {
        require(msg.sender != address(0));
        contractOwner = msg.sender;
    }

    /**
     * Function for buying a standard pack of kards (kards with no effect)
     * Checks that there is enough kards left to buy, randomly selects the number
     * of kards in a pack, and assigns them to the buyer.
     */
    function buyStandardPack() external payable {
        require(msg.sender != address(0));
        require(msg.value == standardPackPrice, "Not enough ether to buy a standard pack");
        require(issuedStandardKards <= (standardKardAmount - packSize), "No more Standard Kards left to issue");

        uint256 randomIndex = 0;

        for (uint8 i = 0; i < packSize; i++) {
            // see documentation on random function
            randomIndex = random(block.timestamp + randomIndex, standardKardAmount);
            issueStandardKard(msg.sender, randomIndex);
            issuedStandardKards++;
        }
    }

    /**
     * Function for buying a platinum pack of kards (kards with an effect)
     * Checks that there is enough kards left to buy, randomly selects the number
     * of kards in a pack, and assigns them to the buyer.
     */
    function buyPlatinumPack() external payable {
        require(msg.sender != address(0));
        require(msg.value == platinumPackPrice, "Not enough ether to buy a platinum pack");
        require(issuedPlatinumKards < (platinumKardAmount - packSize), "No more Platinum Kards left to issue");

        uint256 randomIndex = 0;

        for (uint8 i = 0; i < packSize; i++) {
            randomIndex = random(block.timestamp + randomIndex, platinumKardAmount) + standardKardAmount;
            issuePlatinumKard(msg.sender, randomIndex);
            issuedPlatinumKards++;
        }
    }

    /**
     *  External transfer function, used for trading amongst users
     */
    function transfer(address to, uint256 kardId) external {
        _transfer(msg.sender, to, kardId);
    }

    function getKard(uint256 kardId) public pure returns (uint256 color, uint256 shape, uint256 effect) {
        require(kardId < (standardKardAmount + platinumKardAmount));
        effect = kardId / 25;
        color = (kardId % 25) / 5;
        shape = (kardId % 25) % 5;

        return (color, shape, effect);
    }

    /**
     * Returns an array of kardId's that the owner owns
     */
    function getOwnedKards(address owner) public view returns (uint256[] cards){
        return ownedKards[owner];
    }

    /**
     * Withdrawal function so the contract owner can withdraw funds from the contract.
     * This is here to show that the contract holds the ether used to buy the kards
     * until the contract owner withdrawals the ether.
     */
    function withdraw(uint amount)
        public
    {
        require(msg.sender == contractOwner);
        require(amount <= address(this).balance);
        contractOwner.transfer(amount);
    }

    /**
     * Internal transfer function. Checks the ownership of the kardId, removes the
     * kard from the current owners array of owned kardId's, and assigns the kard
     * to it's new owner.
     */
    function _transfer(address from, address to, uint256 kardId)
        internal
    {
        require(from != address(0) && from != address(this));
        require(to != address(0) && to != address(this));
        require(owns(from, kardId), "Sender does not own Kard");

        // Remove Kard from 'from' address in ownedKards
        uint256 fromNumCards = ownedKards[from].length;
        for (uint8 i = 0; i < fromNumCards; i++) {
            if (ownedKards[from][i] == kardId) {
                // move the last Kard to this spot
                ownedKards[from][i] = ownedKards[from][fromNumCards - 1];
                // delete last element in array and decrement its length
                delete ownedKards[from][fromNumCards - 1];
                ownedKards[from].length--;
                break;
            }
        }

        // Assign Kard to new owner
        kardOwner[kardId] = to;
        ownedKards[to].push(kardId);
    }

    /**
     * Internal function used to issue new Kards from the store.
     * Given a randomIndex (or kardId), this will check if the kardId is already owned
     * If it is, then it will go to the next kard in the list, and repeat until
     * there is a kard with no owner
     */
    function issueStandardKard(address to, uint256 randomIndex)
        internal
        returns (uint256)
    {
        require(randomIndex < standardKardAmount);
        // If no one owns the Kard, then it can be added to a pack
        if (kardOwner[randomIndex] == 0)  {

            ownedKards[to].push(randomIndex);
            kardOwner[randomIndex] = to;
            return randomIndex;
        } else {
            // Someone else already owns this Kard at this index so increment it and try again
            // We increment here because as the number of available kards decreases, the chance
            // of randomly selecting an available kard substantially decreases.
            randomIndex++;
            // Need to do some bounds checking so we don't issue the wrong card or overflow
            // So loop back to the beginning index of this Kard type
            if (randomIndex == standardKardAmount) {
                randomIndex = 0;
            }
            return issueStandardKard(to, randomIndex);
        }
    }

    /**
     * Same functionality as above function, just with different bounds for platinum.
     */
    function issuePlatinumKard(address to, uint256 randomIndex)
        internal
        returns (uint256)
    {
        require(randomIndex >= standardKardAmount);
        require(randomIndex < (standardKardAmount + platinumKardAmount));
        // If no one owns the Kard, then it can be added to a pack
        if (kardOwner[randomIndex] == 0)  {

            ownedKards[to].push(randomIndex);
            kardOwner[randomIndex] = to;
            return randomIndex;
        } else {
            // Someone else already owns this Kard at this index so increment it and try again
            randomIndex++;
            // Need to do some bounds checking so we don't issue the wrong card or overflow
            // So loop back to the beginning index of this Kard type
            if (randomIndex == (standardKardAmount + platinumKardAmount)) {
                randomIndex = standardKardAmount;
            }
            return issuePlatinumKard(to, randomIndex);
        }
    }

    /**
     * Internal function for checking ownership.
     * Returns true if the address at the kardId index is the same as the address passed in
     */
    function owns(address claimant, uint256 kardId)
        internal
        view
        returns (bool)
    {
        return kardOwner[kardId] == claimant;
    }

    //
    // This relies on trusting the mining node.
    //

    /**
     * Random function adapted from src: https://medium.com/promentol/lottery-smart-contract-can-we-generate-random-numbers-in-solidity-4f586a152b27
     * This relies on trusting the transaction mining node. While this function is NOT safe
     * for PUBLIC blockchains, in a permissioned blockchain system, malicious miners can have
     * their node removed from the network.
     */
    function random(uint256 seed, uint8 max) internal pure returns (uint256) {
        // by default this will return a number between [0, max-1]
        return uint256(keccak256(seed))%uint256(max);
    }

}

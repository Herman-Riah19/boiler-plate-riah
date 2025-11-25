// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractManager is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    struct ContractData {
        uint256 id;
        address creator;
        string metadataURI; // IPFS / JSON stocké
        bool executed;
    }

    uint256 public counter;
    mapping(uint256 => ContractData) public contractsList;

    event ContractCreated(uint256 id, address creator, string metadataURI);
    event ContractExecuted(uint256 id, address executor);

    function createContract(string memory metadataURI) external {
        counter += 1;

        contractsList[counter] = ContractData({
            id: counter,
            creator: msg.sender,
            metadataURI: metadataURI,
            executed: false
        });

        emit ContractCreated(counter, msg.sender, metadataURI);
    }

    function executeContract(uint256 id) external onlyOwner {
        require(!contractsList[id].executed, "Already executed");
        contractsList[id].executed = true;
        emit ContractExecuted(id, msg.sender);
    }
}

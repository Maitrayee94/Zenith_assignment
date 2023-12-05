// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;
    mapping(address => bool) public whitelist;

    event WhitelistUpdated(address indexed account, bool isWhitelisted);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyOwnerOrWhitelisted() {
        require(msg.sender == owner || whitelist[msg.sender], "Not the contract owner or whitelisted");
        _;
    }

    constructor() {
        owner = msg.sender;
        whitelist[owner] = true; // Owner is initially whitelisted
    }

    function updateWhitelist(address account, bool isWhitelisted) external onlyOwner {
        whitelist[account] = isWhitelisted;
        emit WhitelistUpdated(account, isWhitelisted);
    }
}
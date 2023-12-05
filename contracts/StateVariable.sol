// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Ownable.sol";


contract StateVariable is Ownable {
    uint256 public counter;

    event StateUpdated(uint256 newValue);

    function getState() external view returns (uint256) {
        return counter;
    }

    function updateState(uint256 newValue) external onlyOwnerOrWhitelisted {
        require(newValue != counter, "New value must be different");
        counter = newValue;
        emit StateUpdated(newValue);
    }
}

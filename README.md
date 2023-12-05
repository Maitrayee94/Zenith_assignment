# 🛠️ State Variable assignment
>
> This project done as a assignment given by Zenith Lab.
> The contract is deployed at sepolia test net at `0xd5CEf8806aAEFdD474B6E37E52A6cf1810cBe4f0`, you can also view the contract from here https://sepolia.etherscan.io/address/0xd5CEf8806aAEFdD474B6E37E52A6cf1810cBe4f0 


## What is inside?

- How to install this code and deployed at Ethereum testnet
- Breakdown the testcases
- Breakdown the event, modifiers and inheritance 


## How to install this code and deployed at Ethereum testnet

1.  Write ```git clone https://github.com/Maitrayee94/Zenith_assignment.git``` at terminal or download the zip file.
2.  Next write `yarn install` or `npm install` at terminal
3.  To run the test cases write `Npx hardhat test`
4.  Change `.env.example` into `.env` and configure it
5.  For the RPC_URL - Go to QuickNode and sign up for an account if you haven't already. If you have a pre-existing Sepolia RPC URL there, you can continue using the same one. Copy that and replace the value in the .env file with  the link. If you don't already have one, create an Endpoint on QuickNode and select Ethereum and then the Sepolia Testnet. After creating the endpoint, copy the HTTP Provider link from there and add that to the RPC_URL in the .env file.
6.  For the PRIVATE_KEY - you need to export this from MetaMask. Take this time to double check you aren't exporting an account that has any funds on Ethereum Mainnet (or any other mainnet). Use a development account only to avoid making mistakes and accidentally leaking your private key with funds on it and having them  stolen. Once you have the private key, replace the placeholder value in the .env file with it.
7.  For the ETHERSCAN_API_KEY - sign in/sign up to Etherscan at https://etherscan.io/ and then generate/re-use an API Key from there and add it to the .env.
8. Now `npx hardhat run scripts/deploy.js --network sepolia` run this code at terminal, your contract will deployed at ethereum testnet and verified.

## Breakdown the testcases

There are 9 testcase implimented.
1. contract deployed and owner is set properly.
2. `getState()` function working properly or not to read the value.
3. `updateState()` fucntion only for owner update the state variable properly.
4.  The event `StateUpdated()` emitted properly.
5. Whitelist address will able to update the value of State variable.
6. A address which is not owner also not whitlisted will not able to update the value of State variable.
7. The StateVariable contract inherit Ownable contract, so the `updateWhitelist()` avaiable to StateVariable contract and the owner of StateVariable contract able to call `updateWhitelist()` and add a new address for Whitelist properly.
8. The event `WhitelistUpdated()` emitted properly.
9. only owner will able to add whitelist address.

## Breakdown the event, modifiers and inheritance 

### Events
There are 2 Event performed.
1. `StateUpdated()` event which is emit after update the variable value at StateVariable Contract.
2. `WhitelistUpdated()` this event emit after a address added for whitelist at Ownable Contract.

### Modifiers
There are 2 modifiers used at Ownable contract to add extra condition to a function.
1. `onlyOwner()` checks for only owner.
2. `onlyOwnerOrWhitelisted()` checks for Owner as well as whitlist address.

### Inheritance
- The StateVariable contract inherit Ownable contract by using `import "./Ownable.sol";` this line StateVariable extened it's functionality and imported all the functionality from Ownable contract.
- `contract StateVariable is Ownable` this is where The StateVariable contract is inheriting from Ownable, which means it will have access to all the state variables, functions, and modifiers defined in the Ownable contract. This allows the StateVariable contract to reuse the all functionality without duplicating code.

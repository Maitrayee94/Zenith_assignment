const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect } = require("chai");

describe("StateVariable", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariable() {

    // Contracts are deployed using the first signer/account by default
    const [ owner ] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("StateVariable");
    const lock = await Lock.deploy();

    return { lock, owner};
  }
  it("Should deploy and set the owner correctly", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);

    expect(await lock.owner()).to.equal(owner.address);
  });

  it("Should able to read the value", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);

    expect(await lock.getState());
  });

  it("Should able Update the value to 42", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);

    await lock.connect(owner).updateState(42);
    const updatedState = await lock.getState();
    expect(updatedState).to.equal(42);
  });

  it("Should emit StateUpdated event when the state changes", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);

    // Perform the state update
    const transaction = await lock.connect(owner).updateState(42);

    // Wait for the transaction to be mined
    await transaction.wait();

    // Check if the StateUpdated event was emitted
    const filter = lock.filters.StateUpdated();
    const events = await lock.queryFilter(filter);

    expect(events.length).to.equal(1, "StateUpdated event should be emitted once");
    expect(events[0].args.newValue).to.equal(42, "Event should contain the new value");
  });
  
  it("Should allow owner and whitelisted address to update the value", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);
    const whitelistedAddress = (await ethers.getSigners())[1];
  
    // Whitelist the address
    await lock.connect(owner).updateWhitelist(whitelistedAddress.address, true);
  
    // Owner should be able to update the state
    await lock.connect(owner).updateState(42);
    let updatedState = await lock.getState();
    expect(updatedState).to.equal(42);
  
    // Whitelisted address should be able to update the state
    await lock.connect(whitelistedAddress).updateState(43);
    updatedState = await lock.getState();
    expect(updatedState).to.equal(43);
  });
  

  it("Should not allow non-owner or non-whitelisted address to update the value", async function () {
    const { lock } = await loadFixture(deployContractAndSetVariable);
    const nonOwner = (await ethers.getSigners())[2];
  
    // Attempt to update state by non-owner should fail
    await expect(lock.connect(nonOwner).updateState(42)).to.be.revertedWith("Not the contract owner or whitelisted");
  });

  it("Should allow owner to add an address to the whitelist", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);
    const newAddress = (await ethers.getSigners())[2];
  
    // Owner adds a new address to the whitelist
    await lock.connect(owner).updateWhitelist(newAddress.address, true);
  
    // Check if the new address is whitelisted
    const isWhitelisted = await lock.whitelist(newAddress.address);
    expect(isWhitelisted).to.be.true;
  });
  
  it("Should emit WhitelistUpdated event when owner adds an address to the whitelist", async function () {
    const { lock, owner } = await loadFixture(deployContractAndSetVariable);
    const newAddress = (await ethers.getSigners())[2];
  
    // Owner adds a new address to the whitelist
    const transaction = await lock.connect(owner).updateWhitelist(newAddress.address, true);
  
    // Wait for the transaction to be mined
    await transaction.wait();
  
    // Check if the WhitelistUpdated event was emitted
    const filter = lock.filters.WhitelistUpdated();
    const events = await lock.queryFilter(filter);
  
    expect(events.length).to.equal(1, "WhitelistUpdated event should be emitted once");
    expect(events[0].args.account).to.equal(newAddress.address, "Event should contain the new whitelisted address");
    expect(events[0].args.isWhitelisted).to.be.true;
  });
  
  it("Should not allow non-owner to add an address to the whitelist", async function () {
    const { lock } = await loadFixture(deployContractAndSetVariable);
    const nonOwner = (await ethers.getSigners())[2];
  
    // Attempt to add an address to the whitelist by non-owner should fail
    await expect(lock.connect(nonOwner).updateWhitelist(nonOwner.address, true)).to.be.revertedWith("Not the contract owner");
  });
  
});
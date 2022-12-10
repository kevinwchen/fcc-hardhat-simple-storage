const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

// Run with yarn hardhat test

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage
  // Function to be run before each test
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // Each it() is an individual tests
  it("Should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
    // Alternative method to check test condition
    // expect(currentValue.toString().to.equal(expectedValue))
  })
  it("Should updated when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
})

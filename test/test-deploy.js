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
  it("Should update when store function is called", async function () {
    const expectedValue = "4"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should add a person and their favourite number to the People array when addPerson is called", async function () {
    const expectedValue = "7"
    const expectedPerson = "Kevin"
    const transactionResponse = await simpleStorage.addPerson(
      expectedPerson,
      expectedValue
    )
    await transactionResponse.wait(1)
    const currentPerson = await simpleStorage.retrieveLatestName()
    const currentValue = await simpleStorage.retrieveLatestNumber()
    assert.equal(currentValue.toString(), expectedValue)
    assert.equal(currentPerson, expectedPerson)
  })
})

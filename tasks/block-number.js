const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
  async (taskArgs, hre) => {
    // hre = hardhat runtime environment, can access hardhat packages
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`)
  }
)

module.exports = {}

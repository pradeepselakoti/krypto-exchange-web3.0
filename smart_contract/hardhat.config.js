

require("@nomicfoundation/hardhat-toolbox");

// Replace your existing config with this:
module.exports = {
  solidity: "0.8.19", // or your preferred version
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/Hub_EYoep0ulYAUZ6aQiC',
      accounts: ['be3f95d5206e69c1bf17af27b3384171318d73269c2aa7bb5d8a3c9f8aace6d4']

    }
  }
};
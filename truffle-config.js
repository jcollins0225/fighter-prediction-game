require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY, // Use PRIVATE_KEY
          `https://data-seed-prebsc-1-s1.binance.org:8545` // BSC Testnet RPC
        ),
      network_id: 97, // BSC Testnet ID
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bscMainnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY, // Use PRIVATE_KEY
          `https://bsc-dataseed.binance.org/` // BSC Mainnet RPC
        ),
      network_id: 56, // BSC Mainnet ID
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.21", // Match your Solidity version
    },
  },
};
